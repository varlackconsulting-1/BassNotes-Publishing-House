import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Loader2, ShoppingCart, Download, BookOpen, SlidersHorizontal, Star } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmNmY4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

const CATEGORIES = [
  { id: 'all', label: 'All Books' },
  { id: 'physical', label: 'Physical Books' },
  { id: 'ebook', label: 'eBooks' },
  { id: 'featured', label: 'Featured' },
  { id: 'new', label: 'New Releases' },
];

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'title', label: 'Title A–Z' },
];

function isDigital(p) {
  return p.type?.value === 'service' || /ebook|e-book|digital/i.test(p.title);
}

function ProductCard({ product, index }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const variant = product.variants?.[0];
  const digital = isDigital(product);
  const hasSale = variant && variant.sale_price_in_cents !== null;
  const displayPrice = hasSale ? variant.sale_price_formatted : variant?.price_formatted;

  const quickAdd = async (e) => {
    e.preventDefault();
    if (!variant) return;
    try {
      await addToCart(product, variant, 1, variant.inventory_quantity);
      toast({ title: 'Added to cart', description: product.title });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Could not add', description: err.message });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.04 }}>
      <Link to={`/product/${product.id}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-20px_rgba(10,61,98,0.25)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
          <img src={product.image || placeholderImage} alt={product.title} className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105" loading="lazy" />
          {product.ribbon_text && <span className="absolute left-3 top-3 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">{product.ribbon_text}</span>}
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary shadow-sm">
            {digital ? <Download className="h-3 w-3" /> : <BookOpen className="h-3 w-3" />}
            {digital ? 'eBook' : 'Hardcover'}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">{product.title}</h3>
          <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">{product.subtitle || product.description?.replace(/<[^>]+>/g, '').slice(0, 90)}</p>
          {product.reviews_analytics && product.reviews_analytics.total_reviews > 0 && (
            <div className="mt-2 flex items-center gap-1">
              <Star className="h-3 w-3 fill-secondary text-secondary" />
              <span className="text-xs text-muted-foreground">{product.reviews_analytics.average_rating} ({product.reviews_analytics.total_reviews})</span>
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-base font-bold text-primary">{displayPrice}</span>
            <button onClick={quickAdd} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:brightness-110 active:scale-95" aria-label={`Add ${product.title} to cart`}>
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BookstorePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params] = useSearchParams();
  const [search, setSearch] = useState(() => params.get('q') || '');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await getProducts({ limit: 100 });
        if (res.products.length === 0) { setProducts([]); return; }
        const ids = res.products.map((p) => p.id);
        let qmap = new Map();
        try {
          const q = await getProductQuantities({ fields: 'inventory_quantity', product_ids: ids });
          q.variants.forEach((v) => qmap.set(v.id, v.inventory_quantity));
        } catch { /* ignore */ }
        setProducts(res.products.map((p) => ({
          ...p,
          variants: p.variants.map((v) => ({ ...v, inventory_quantity: qmap.get(v.id) ?? v.inventory_quantity })),
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setSearch(params.get('q') || '');
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => (p.title + ' ' + (p.subtitle || '') + ' ' + (p.description || '')).toLowerCase().includes(q));
    }
    if (category === 'physical') list = list.filter((p) => !isDigital(p));
    else if (category === 'ebook') list = list.filter((p) => isDigital(p));
    else if (category === 'featured') list = list.filter((p) => /cosomnia/i.test(p.title));
    else if (category === 'new') list = list.slice().sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''));

    if (sort === 'price-asc') list.sort((a, b) => (a.price_in_cents || 0) - (b.price_in_cents || 0));
    else if (sort === 'price-desc') list.sort((a, b) => (b.price_in_cents || 0) - (a.price_in_cents || 0));
    else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [products, search, category, sort]);

  const featured = products.filter((p) => /cosomnia/i.test(p.title)).slice(0, 2);

  return (
    <main className="bg-background">
      <Helmet>
        <title>Bookstore — BassNotes Publishing House</title>
        <meta name="description" content="Shop original BassNotes books — Cosomnia and Super Bass Heroes in hardcover and eBook. Secure checkout, customer accounts, and instant digital downloads." />
      </Helmet>
      <Seo title="Bookstore — BassNotes Publishing House" description="Shop original BassNotes books in hardcover and eBook. Secure checkout, customer accounts, and instant digital downloads." siteName="BassNotes" />

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border/40">
        <Starfield density={24} className="opacity-50" />
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 20%, hsl(205 82% 21% / 0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, hsl(30 89% 55% / 0.10), transparent 55%)' }} aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-44 text-center md:pb-24 md:pt-[13.5rem]">
          <Reveal>
            <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-primary"><span className="h-px w-10 bg-primary/60" /> The Bookstore <span className="h-px w-10 bg-primary/60" /></p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-tight tracking-tight text-primary md:text-6xl">Stories you can hold — and download</h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">Original BassNotes books in hardcover and eBook. Secure checkout, customer accounts, and instant digital delivery to your library.</p>
          </Reveal>
        </div>
      </section>

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="border-b border-border/40 bg-muted/30">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <Reveal><p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Featured Books</p></Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {featured.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <Link to={`/product/${p.id}`} className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40">
                    <img src={p.image || placeholderImage} alt={p.title} className="h-32 w-24 shrink-0 rounded-lg object-contain" loading="lazy" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">Featured</p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-primary group-hover:text-secondary">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.subtitle || p.description?.replace(/<[^>]+>/g, '').slice(0, 100)}</p>
                      <p className="mt-2 text-sm font-bold text-primary">{p.price_formatted}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalog with search + filters */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-primary md:text-3xl">Browse the catalog</h2>
            <p className="mt-1 text-sm text-muted-foreground">{filtered.length} title{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-3 md:max-w-xl md:justify-end">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>
            <button onClick={() => setShowFilters((v) => !v)} className="flex h-11 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium text-foreground hover:border-primary/50 md:hidden">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="hidden h-11 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary md:block">
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category tabs */}
        <div className={`mt-5 flex flex-wrap gap-2 ${showFilters ? '' : 'max-md:hidden'}`}>
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${category === c.id ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:border-primary/50'}`}>
              {c.label}
            </button>
          ))}
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-auto rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold outline-none focus:border-primary md:hidden">
            {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : error ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">Could not load products. Please try again.</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <p className="text-sm text-muted-foreground">No books match your search.</p>
              <button onClick={() => { setSearch(''); setCategory('all'); }} className="mt-4 text-sm font-semibold text-primary hover:underline">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* Trust band */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-3">
          {[
            { icon: BookOpen, title: 'Original IP', body: 'Every title is original BassNotes literature by Torin Varlack.' },
            { icon: Download, title: 'Instant eBooks', body: 'Digital downloads delivered securely to your library after purchase.' },
            { icon: ShoppingCart, title: 'Secure Checkout', body: 'SSL-protected payments via Stripe. Visa, Mastercard, Amex, Apple Pay.' },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><f.icon className="h-5 w-5" /></span>
              <div><h3 className="font-semibold text-foreground">{f.title}</h3><p className="mt-1 text-sm text-muted-foreground">{f.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
