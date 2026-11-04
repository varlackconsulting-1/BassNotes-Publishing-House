import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart as ShoppingCartIcon, X, Trash2, Tag, Loader2, Lock } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { EcommerceTrackingEvent, trackEcommerceEvent } from '@/api/EcommerceApi';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    cartItems, removeFromCart, updateQuantity,
    subtotalCents, discountCents, taxCents, shippingCents, totalCents,
    discount, applyDiscount, removeDiscount, formatAmount, clearCart,
    isCartOpen, setIsCartOpen,
  } = useCart();
  const [code, setCode] = useState('');
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const checkout = params.get('checkout');
    if (!checkout) return;
    if (checkout === 'success') clearCart();
    params.delete('checkout');
    const newSearch = params.toString();
    const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [clearCart]);

  useEffect(() => {
    if (isCartOpen && cartItems.length > 0) {
      trackEcommerceEvent({ event: EcommerceTrackingEvent.ViewCart, items: cartItems });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  const handleApplyCode = useCallback(async () => {
    if (!code.trim()) return;
    setApplying(true);
    const ok = await applyDiscount(code);
    setApplying(false);
    if (ok) {
      toast({ title: 'Discount applied', description: `${code.trim().toUpperCase()} is now active.` });
      setCode('');
    } else {
      toast({ title: 'Invalid code', description: 'That discount code is not valid or has expired.', variant: 'destructive' });
    }
  }, [code, applyDiscount, toast]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      toast({ title: 'Your cart is empty', description: 'Add some books before checking out.', variant: 'destructive' });
      return;
    }
    setIsCartOpen(false);
    navigate('/checkout-flow');
  }, [cartItems.length, navigate, setIsCartOpen, toast]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-xl font-semibold text-foreground">Your Cart</h2>
              <Button onClick={() => setIsCartOpen(false)} variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <ShoppingCartIcon className="mb-4 h-12 w-12 opacity-40" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="mt-1 text-sm">Browse the bookstore to find your next read.</p>
                  <Button onClick={() => { setIsCartOpen(false); navigate('/bookstore'); }} className="mt-6 bg-primary text-primary-foreground">
                    Browse Books
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.variant.id} className="flex gap-4 rounded-xl border border-border bg-card p-3">
                      <img src={item.product.image} alt={item.product.title} className="h-20 w-16 shrink-0 rounded-md object-cover" />
                      <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-foreground">{item.product.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.variant.title}</p>
                        <p className="mt-1 text-sm font-bold text-primary">{formatAmount(item.variant.sale_price_in_cents ?? item.variant.price_in_cents)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button onClick={() => updateQuantity(item.variant.id, Math.max(1, item.quantity - 1))} className="px-2.5 py-1 text-foreground hover:text-primary" aria-label="Decrease quantity">−</button>
                          <span className="px-1 text-sm font-semibold text-foreground">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)} className="px-2.5 py-1 text-foreground hover:text-primary" aria-label="Increase quantity">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.variant.id)} className="flex items-center gap-1 text-xs text-destructive hover:underline">
                          <Trash2 className="h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-border px-6 py-5">
                {/* Discount code */}
                <div className="mb-4">
                  {discount ? (
                    <div className="flex items-center justify-between rounded-lg bg-secondary/10 px-3 py-2">
                      <span className="flex items-center gap-2 text-sm font-medium text-secondary"><Tag className="h-4 w-4" /> {discount.code}</span>
                      <button onClick={removeDiscount} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Discount code"
                        className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
                      />
                      <Button onClick={handleApplyCode} variant="outline" size="sm" disabled={applying} className="rounded-full">
                        {applying ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply'}
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span><span>{formatAmount(subtotalCents)}</span>
                  </div>
                  {discountCents > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount</span><span>−{formatAmount(discountCents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (8.25%)</span><span>{formatAmount(taxCents)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping {shippingCents === 0 && <span className="text-xs">(digital)</span>}</span>
                    <span>{shippingCents === 0 ? 'Free' : formatAmount(shippingCents)}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-border pt-2 text-base font-bold text-foreground">
                    <span>Total</span><span>{formatAmount(totalCents)}</span>
                  </div>
                </div>

                <Button onClick={handleCheckout} className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground hover:brightness-110">
                  <Lock className="mr-2 h-4 w-4" /> Secure Checkout
                </Button>
                <p className="mt-2 text-center text-[11px] text-muted-foreground">SSL protected · Visa · Mastercard · Amex · Discover · Apple Pay · Google Pay</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
