import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Loader2, Package, Download, User, MapPin, Heart, LogOut, Plus, Trash2, BookOpen, Check,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const TABS = [
  { id: 'orders', label: 'Recent Orders', icon: Package },
  { id: 'downloads', label: 'My Downloads', icon: Download },
  { id: 'details', label: 'Account Details', icon: User },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
];

const BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110 active:scale-[0.98]';

export default function AccountPage() {
  const { user, isAuthed, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [addrForm, setAddrForm] = useState({ address_type: 'shipping', full_name: '', line1: '', line2: '', city: '', state: '', postal_code: '', country: 'United States', phone: '' });

  useEffect(() => {
    if (!isAuthed) { navigate('/login?redirect=/account'); return; }
    if (!user) return;
    setProfile({ name: user.name || '', email: user.email || '' });
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const [o, d, a, w] = await Promise.all([
          pb.collection('customer_orders').getFullList({ filter: pb.filter('owner = {:o}', { o: user.id }), sort: '-created' }).catch(() => []),
          pb.collection('digital_purchases').getFullList({ filter: pb.filter('owner = {:o}', { o: user.id }), sort: '-created' }).catch(() => []),
          pb.collection('customer_addresses').getFullList({ filter: pb.filter('owner = {:o}', { o: user.id }), sort: '-created' }).catch(() => []),
          pb.collection('wishlist').getFullList({ filter: pb.filter('owner = {:o}', { o: user.id }), sort: '-created' }).catch(() => []),
        ]);
        if (!active) return;
        setOrders(o); setDownloads(d); setAddresses(a); setWishlist(w);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [isAuthed, user, navigate]);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await pb.collection('users').update(user.id, { name: profile.name.trim() });
      toast.success('Profile updated.');
    } catch (err) {
      toast.error('Could not update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    try {
      await pb.collection('customer_addresses').create({ ...addrForm, owner: user.id });
      const a = await pb.collection('customer_addresses').getFullList({ filter: pb.filter('owner = {:o}', { o: user.id }), sort: '-created' });
      setAddresses(a);
      setShowAddrForm(false);
      setAddrForm({ address_type: 'shipping', full_name: '', line1: '', line2: '', city: '', state: '', postal_code: '', country: 'United States', phone: '' });
      toast.success('Address saved.');
    } catch (err) {
      toast.error('Could not save address.');
    }
  };

  const deleteAddress = async (id) => {
    try { await pb.collection('customer_addresses').delete(id); setAddresses((p) => p.filter((a) => a.id !== id)); } catch { /* ignore */ }
  };

  const removeWishlist = async (id) => {
    try { await pb.collection('wishlist').delete(id); setWishlist((p) => p.filter((w) => w.id !== id)); } catch { /* ignore */ }
  };

  const downloadFile = (item) => {
    if (!item.file) { toast.info('Digital file will be available once uploaded by BassNotes.'); return; }
    const url = pb.files.getURL(item, item.file);
    window.open(url, '_blank');
  };

  if (!isAuthed) return null;

  return (
    <main className="min-h-[100dvh] bg-muted/20 pt-36">
      <Helmet>
        <title>My Account — BassNotes Bookstore</title>
        <meta name="description" content="Your BassNotes account dashboard — orders, downloads, profile, addresses, and wishlist." />
      </Helmet>
      <Seo title="My Account — BassNotes" description="Your BassNotes account dashboard." siteName="BassNotes" />

      <div className="mx-auto max-w-6xl px-6 py-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">My Account</p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Hello, {user?.name || user?.email}</h1>
            </div>
            <button onClick={() => { logout(); navigate('/'); }} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition hover:border-destructive hover:text-destructive">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
          {/* Sidebar */}
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${tab === t.id ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted'}`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
            <Link to="/account/library" className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              <BookOpen className="h-4 w-4" /> My Library
            </Link>
          </nav>

          {/* Content */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : tab === 'orders' ? (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Recent Orders</h2>
                {orders.length === 0 ? (
                  <EmptyState icon={Package} title="No orders yet" body="Your purchases will appear here." cta={<Link to="/bookstore" className={BTN}>Browse Books</Link>} />
                ) : (
                  <div className="mt-4 space-y-3">
                    {orders.map((o) => (
                      <div key={o.id} className="rounded-xl border border-border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-foreground">Order {o.store_order_id || o.id.slice(0, 8)}</span>
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">{o.status || 'processing'}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{new Date(o.created).toLocaleDateString()} · ${(o.total_cents / 100).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : tab === 'downloads' ? (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">My Downloads</h2>
                {downloads.length === 0 ? (
                  <EmptyState icon={Download} title="No downloads yet" body="eBook purchases appear here for instant download." cta={<Link to="/bookstore" className={BTN}>Shop eBooks</Link>} />
                ) : (
                  <div className="mt-4 space-y-3">
                    {downloads.map((d) => (
                      <div key={d.id} className="flex items-center gap-4 rounded-xl border border-border p-4">
                        {d.cover_url && <img src={d.cover_url} alt={d.product_title} className="h-16 w-12 rounded object-cover" />}
                        <div className="flex-1"><p className="font-semibold text-foreground">{d.product_title}</p><p className="text-xs text-muted-foreground">Purchased {new Date(d.created).toLocaleDateString()}</p></div>
                        <button onClick={() => downloadFile(d)} className={BTN}><Download className="h-4 w-4" /> Download</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : tab === 'details' ? (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Account Details</h2>
                <form onSubmit={saveProfile} className="mt-4 max-w-md space-y-4">
                  <div><label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</label><input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="mt-1 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary" /></div>
                  <div><label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</label><input value={profile.email} disabled className="mt-1 h-11 w-full rounded-lg border border-border bg-muted px-4 text-sm text-muted-foreground" /></div>
                  <button type="submit" disabled={savingProfile} className={BTN}>{savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4" /> Save Changes</>}</button>
                </form>
              </div>
            ) : tab === 'addresses' ? (
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-semibold text-primary">Addresses</h2>
                  <button onClick={() => setShowAddrForm((v) => !v)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"><Plus className="h-4 w-4" /> Add address</button>
                </div>
                {showAddrForm && (
                  <form onSubmit={saveAddress} className="mt-4 grid gap-3 rounded-xl border border-border p-4 sm:grid-cols-2">
                    <select value={addrForm.address_type} onChange={(e) => setAddrForm((p) => ({ ...p, address_type: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary">
                      <option value="shipping">Shipping</option><option value="billing">Billing</option>
                    </select>
                    <input placeholder="Full name" value={addrForm.full_name} onChange={(e) => setAddrForm((p) => ({ ...p, full_name: e.target.value }))} required className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <input placeholder="Address line 1" value={addrForm.line1} onChange={(e) => setAddrForm((p) => ({ ...p, line1: e.target.value }))} required className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary sm:col-span-2" />
                    <input placeholder="Address line 2 (optional)" value={addrForm.line2} onChange={(e) => setAddrForm((p) => ({ ...p, line2: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary sm:col-span-2" />
                    <input placeholder="City" value={addrForm.city} onChange={(e) => setAddrForm((p) => ({ ...p, city: e.target.value }))} required className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <input placeholder="State" value={addrForm.state} onChange={(e) => setAddrForm((p) => ({ ...p, state: e.target.value }))} required className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <input placeholder="ZIP" value={addrForm.postal_code} onChange={(e) => setAddrForm((p) => ({ ...p, postal_code: e.target.value }))} required className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <input placeholder="Phone" value={addrForm.phone} onChange={(e) => setAddrForm((p) => ({ ...p, phone: e.target.value }))} className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary" />
                    <button type="submit" className={`${BTN} sm:col-span-2`}>Save Address</button>
                  </form>
                )}
                {addresses.length === 0 && !showAddrForm ? (
                  <EmptyState icon={MapPin} title="No saved addresses" body="Add a shipping or billing address for faster checkout." />
                ) : (
                  <div className="mt-4 space-y-3">
                    {addresses.map((a) => (
                      <div key={a.id} className="flex items-start justify-between rounded-xl border border-border p-4">
                        <div>
                          <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-secondary">{a.address_type}</span>
                          <p className="mt-2 text-sm font-medium text-foreground">{a.full_name}</p>
                          <p className="text-sm text-muted-foreground">{a.line1}{a.line2 ? `, ${a.line2}` : ''}, {a.city}, {a.state} {a.postal_code}</p>
                          <p className="text-sm text-muted-foreground">{a.country}{a.phone ? ` · ${a.phone}` : ''}</p>
                        </div>
                        <button onClick={() => deleteAddress(a.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : tab === 'wishlist' ? (
              <div>
                <h2 className="font-display text-xl font-semibold text-primary">Wishlist</h2>
                {wishlist.length === 0 ? (
                  <EmptyState icon={Heart} title="Your wishlist is empty" body="Save books you love for later." cta={<Link to="/bookstore" className={BTN}>Browse Books</Link>} />
                ) : (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {wishlist.map((w) => (
                      <div key={w.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                        {w.cover_url && <img src={w.cover_url} alt={w.product_title} className="h-16 w-12 rounded object-cover" />}
                        <div className="flex-1"><Link to={`/product/${w.product_id}`} className="text-sm font-semibold text-foreground hover:text-primary">{w.product_title}</Link></div>
                        <button onClick={() => removeWishlist(w.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}

function EmptyState({ icon: Icon, title, body, cta }) {
  return (
    <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-10 text-center">
      <Icon className="h-10 w-10 text-muted-foreground/50" />
      <p className="mt-3 font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  );
}
