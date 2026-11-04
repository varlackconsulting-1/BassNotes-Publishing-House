import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, Check, Lock, ArrowLeft, CreditCard, Truck, User, FileText } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { initializeCheckout } from '@/api/EcommerceApi';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, label: 'Customer Info', icon: User },
  { id: 2, label: 'Shipping', icon: Truck },
  { id: 3, label: 'Billing', icon: FileText },
  { id: 4, label: 'Payment', icon: CreditCard },
  { id: 5, label: 'Confirmation', icon: Check },
];

const INPUT = 'h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary';
const BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110 active:scale-[0.98] disabled:opacity-50';
const GHOST = 'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-primary/50';

export default function CheckoutFlowPage() {
  const navigate = useNavigate();
  const { cartItems, subtotalCents, discountCents, taxCents, shippingCents, totalCents, isDigitalOnly, formatAmount, discount } = useCart();
  const { user, isAuthed } = useAuth();
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState({
    email: user?.email || '', name: user?.name || '',
    ship_line1: '', ship_line2: '', ship_city: '', ship_state: '', ship_zip: '', ship_country: 'United States',
    bill_same: true,
    bill_line1: '', bill_city: '', bill_state: '', bill_zip: '', bill_country: 'United States',
  });
  const [processing, setProcessing] = useState(false);

  // eBook-only: skip shipping
  const effectiveStep = isDigitalOnly && step === 2 ? 3 : step;

  const update = (field) => (e) => setInfo((p) => ({ ...p, [field]: e.target.value }));

  const canProceed = useMemo(() => {
    if (step === 1) return info.email.trim() && info.name.trim();
    if (step === 2 && !isDigitalOnly) return info.ship_line1 && info.ship_city && info.ship_state && info.ship_zip;
    if (step === 3) return info.bill_same || (info.bill_line1 && info.bill_city && info.bill_state && info.bill_zip);
    return true;
  }, [step, info, isDigitalOnly]);

  const next = () => {
    if (!canProceed) { toast.error('Please complete the required fields.'); return; }
    if (step === 1 && !isAuthed) { /* allow guest checkout */ }
    if (isDigitalOnly && step === 1) { setStep(3); return; }
    if (step < 4) setStep(step + 1);
  };
  const back = () => { if (step > 1) setStep(step - 1); };

  const placeOrder = async () => {
    setProcessing(true);
    try {
      const items = cartItems.map((item) => ({ variant_id: item.variant.id, quantity: item.quantity }));
      const successUrl = `${window.location.origin}/checkout-flow?checkout=success`;
      const cancelUrl = `${window.location.href}`;
      const checkoutParams = { items, successUrl, cancelUrl };
      if (isAuthed && user) {
        checkoutParams.customer = { external_id: user.id, email: user.email };
      }
      const { url } = await initializeCheckout(checkoutParams);
      // Record a pending order in PocketBase for the customer dashboard
      if (isAuthed && user) {
        try {
          await pb.collection('customer_orders').create({
            store_order_id: 'pending',
            items: JSON.stringify(cartItems.map((i) => ({ title: i.product.title, variant: i.variant.title, qty: i.quantity, price: i.variant.sale_price_in_cents ?? i.variant.price_in_cents }))),
            total_cents: totalCents,
            currency: 'usd',
            status: 'processing',
            is_digital_only: isDigitalOnly,
            owner: user.id,
          });
        } catch { /* best effort */ }
      }
      window.location.href = url;
    } catch (err) {
      toast.error('Checkout could not start. Please try again.');
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[100dvh] items-center justify-center bg-muted/20 pt-32">
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Link to="/bookstore" className={`${BTN} mt-4`}>Browse Books</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-muted/20 pt-36">
      <Helmet>
        <title>Checkout — BassNotes Bookstore</title>
        <meta name="description" content="Secure BassNotes checkout — customer info, shipping, billing, and payment." />
      </Helmet>
      <Seo title="Checkout — BassNotes" description="Secure BassNotes checkout." siteName="BassNotes" />

      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link to="/bookstore" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to bookstore</Link>

        {/* Stepper */}
        <div className="mt-6 flex items-center justify-between gap-2">
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done = step > s.id;
            const skipped = isDigitalOnly && s.id === 2;
            if (skipped) return null;
            return (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${active ? 'border-primary bg-primary text-primary-foreground' : done ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>
                    {done ? <Check className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </div>
                  <span className={`hidden text-[10px] font-semibold uppercase tracking-wide sm:block ${active ? 'text-primary' : 'text-muted-foreground'}`}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && !skipped && <div className={`h-0.5 flex-1 ${done ? 'bg-primary' : 'bg-border'}`} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            {effectiveStep === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Customer Information</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input className={INPUT} placeholder="Full name" value={info.name} onChange={update('name')} />
                  <input className={INPUT} placeholder="Email" type="email" value={info.email} onChange={update('email')} />
                </div>
                {!isAuthed && <p className="mt-3 text-xs text-muted-foreground">Have an account? <Link to="/login?redirect=/checkout-flow" className="text-primary hover:underline">Sign in</Link> for faster checkout.</p>}
              </div>
            )}

            {effectiveStep === 2 && !isDigitalOnly && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Shipping Address</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input className={`${INPUT} sm:col-span-2`} placeholder="Address line 1" value={info.ship_line1} onChange={update('ship_line1')} />
                  <input className={`${INPUT} sm:col-span-2`} placeholder="Address line 2 (optional)" value={info.ship_line2} onChange={update('ship_line2')} />
                  <input className={INPUT} placeholder="City" value={info.ship_city} onChange={update('ship_city')} />
                  <input className={INPUT} placeholder="State" value={info.ship_state} onChange={update('ship_state')} />
                  <input className={INPUT} placeholder="ZIP" value={info.ship_zip} onChange={update('ship_zip')} />
                  <input className={INPUT} placeholder="Country" value={info.ship_country} onChange={update('ship_country')} />
                </div>
              </div>
            )}

            {effectiveStep === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Billing Information</h2>
                <label className="mt-4 flex items-center gap-2 text-sm text-foreground">
                  <input type="checkbox" checked={info.bill_same} onChange={(e) => setInfo((p) => ({ ...p, bill_same: e.target.checked }))} className="h-4 w-4 rounded border-border" />
                  Billing address same as shipping
                </label>
                {!info.bill_same && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input className={`${INPUT} sm:col-span-2`} placeholder="Address line 1" value={info.bill_line1} onChange={update('bill_line1')} />
                    <input className={INPUT} placeholder="City" value={info.bill_city} onChange={update('bill_city')} />
                    <input className={INPUT} placeholder="State" value={info.bill_state} onChange={update('bill_state')} />
                    <input className={INPUT} placeholder="ZIP" value={info.bill_zip} onChange={update('bill_zip')} />
                    <input className={INPUT} placeholder="Country" value={info.bill_country} onChange={update('bill_country')} />
                  </div>
                )}
              </div>
            )}

            {effectiveStep === 4 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Payment</h2>
                <p className="mt-3 text-sm text-muted-foreground">You will be redirected to our secure Stripe payment page to complete your purchase.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Visa', 'Mastercard', 'Amex', 'Discover', 'Apple Pay', 'Google Pay'].map((m) => (
                    <span key={m} className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground">{m}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4 text-primary" /> SSL-protected payments processed by Stripe. Your card details never touch our servers.
                </div>
                <button onClick={placeOrder} disabled={processing} className={`${BTN} mt-6 w-full`}>
                  {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Lock className="h-4 w-4" /> Pay {formatAmount(totalCents)}</>}
                </button>
              </div>
            )}

            {effectiveStep < 4 && (
              <div className="mt-6 flex justify-between">
                {step > 1 ? <button onClick={back} className={GHOST}>Back</button> : <span />}
                <button onClick={next} disabled={!canProceed} className={BTN}>Continue</button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-lg font-semibold text-primary">Order Summary</h3>
            <div className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.variant.id} className="flex gap-3">
                  <img src={item.product.image} alt={item.product.title} className="h-14 w-10 rounded object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-foreground">{item.product.title}</p>
                    <p className="text-xs text-muted-foreground">{item.variant.title} × {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{formatAmount((item.variant.sale_price_in_cents ?? item.variant.price_in_cents) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>{formatAmount(subtotalCents)}</span></div>
              {discountCents > 0 && <div className="flex justify-between text-secondary"><span>Discount {discount && `(${discount.code})`}</span><span>−{formatAmount(discountCents)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>Tax</span><span>{formatAmount(taxCents)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span>{shippingCents === 0 ? 'Free' : formatAmount(shippingCents)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-foreground"><span>Total</span><span>{formatAmount(totalCents)}</span></div>
            </div>
            {isDigitalOnly && <p className="mt-3 rounded-lg bg-secondary/10 px-3 py-2 text-xs text-secondary">eBook-only order — shipping waived automatically.</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
