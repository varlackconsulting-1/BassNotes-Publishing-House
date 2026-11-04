import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  AlertTriangle, BookPlus, Upload, Package, Users, Receipt, Tag, BarChart3, RefreshCw,
  ExternalLink, ShieldAlert, CheckCircle2,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { getProducts } from '@/api/EcommerceApi';
import pb from '@/lib/pocketbaseClient';

const CARD = 'rounded-2xl border border-border bg-card p-6';

const ADMIN_FEATURES = [
  { icon: BookPlus, title: 'Add Books & eBooks', body: 'Create physical and digital products with cover images, descriptions, and pricing.' },
  { icon: Upload, title: 'Upload Digital Files', body: 'Attach secure eBook files to products — delivered only after successful payment.' },
  { icon: Package, title: 'Edit Inventory', body: 'Track stock levels, manage variants, and toggle product availability.' },
  { icon: Users, title: 'View Customers', body: 'See registered customers, their order history, and digital library access.' },
  { icon: Receipt, title: 'Manage Orders', body: 'Review, fulfill, and track every order through to delivery.' },
  { icon: RefreshCw, title: 'Process Refunds', body: 'Issue full or partial refunds directly from the order dashboard.' },
  { icon: Tag, title: 'Issue Discount Codes', body: 'Create percentage or fixed-amount codes for promotions and preorders.' },
  { icon: BarChart3, title: 'Track Sales Performance', body: 'Monitor revenue, top titles, and conversion trends over time.' },
];

export default function AdminPage() {
  const [productCount, setProductCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProducts({ limit: 100 });
        setProductCount(p.count || p.products.length);
      } catch { /* ignore */ }
      try {
        const customers = await pb.collection('users').getList(1, 1);
        setCustomerCount(customers.totalItems || 0);
      } catch { /* ignore */ }
      try {
        const orders = await pb.collection('customer_orders').getList(1, 1);
        setOrderCount(orders.totalItems || 0);
      } catch { /* ignore */ }
      setLoading(false);
    })();
  }, []);

  return (
    <main className="min-h-[100dvh] bg-muted/20 pt-36">
      <Helmet>
        <title>Admin Dashboard — BassNotes Bookstore</title>
        <meta name="description" content="BassNotes bookstore admin — manage books, eBooks, orders, customers, and payments." />
      </Helmet>
      <Seo title="Admin Dashboard — BassNotes" description="BassNotes bookstore admin dashboard." siteName="BassNotes" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Admin</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Bookstore Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Manage your catalog, orders, customers, and payments.</p>
        </Reveal>

        {/* Stripe reminder */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex items-start gap-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5">
            <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <p className="font-display text-lg font-semibold text-amber-900">Connect BassNotes Stripe account before publishing.</p>
              <p className="mt-1 text-sm text-amber-800">Stripe is the primary payment processor. Connect your account in the store dashboard to accept Visa, Mastercard, American Express, Discover, Apple Pay, and Google Pay. Checkout remains in test mode until connected.</p>
              <a href="https://store.bassnotespublishing.com/" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-600 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:brightness-110">
                Open Store Dashboard <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Products', value: productCount, icon: Package },
            { label: 'Customers', value: customerCount, icon: Users },
            { label: 'Orders', value: orderCount, icon: Receipt },
          ].map((s) => (
            <div key={s.label} className={CARD}>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></span>
                <span className="text-3xl font-bold text-primary">{loading ? '—' : s.value}</span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Admin features grid */}
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-display text-xl font-semibold text-primary">Management tools</h2>
        </Reveal>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ADMIN_FEATURES.map((f) => (
            <div key={f.title} className={CARD}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary"><f.icon className="h-5 w-5" /></span>
              <h3 className="mt-3 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <Reveal delay={0.15}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold text-primary">Store management</h2>
            <p className="mt-1 text-sm text-muted-foreground">Catalog, inventory, orders, customers, refunds, discount codes, and sales analytics are managed in the Hostinger Online Store dashboard.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="https://store.bassnotespublishing.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110">
                Open Store Dashboard <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link to="/bookstore" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-primary/50">
                View Bookstore
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Launch checklist */}
        <Reveal delay={0.2}>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold text-primary">Launch readiness</h2>
            <div className="mt-4 space-y-2.5">
              {[
                'Product catalog created — books and eBooks ready for upload',
                'Customer registration, login, and password reset active',
                'Shopping cart with discount codes, tax, and shipping',
                '5-step checkout flow with eBook shipping removal',
                'Secure digital delivery to customer library',
                'BassNotes-branded email templates (welcome, order, download, reset)',
                'Stripe connection pending — connect before publishing',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${i === 6 ? 'text-amber-500' : 'text-green-600'}`} />
                  <span className={i === 6 ? 'font-medium text-amber-700' : 'text-foreground'}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
