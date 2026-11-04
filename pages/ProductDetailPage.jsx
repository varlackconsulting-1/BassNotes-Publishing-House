import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  EcommerceTrackingEvent, getProduct, getProductQuantities, getProducts, trackEcommerceEvent,
} from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import {
  ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle,
  Star, BookOpen, User, Hash, GraduationCap, Music2, Heart, Download, ShieldCheck,
} from 'lucide-react';
import { BOOKS_CATALOG } from '@/data/catalog';

const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjRmNmY4Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

// Map store product to BassNotes book metadata (verified catalog info only)
function bookMeta(product) {
  const title = (product?.title || '').toLowerCase();
  if (title.includes('cosomnia')) {
    const c = BOOKS_CATALOG.find((b) => b.id === 'cosomnia');
    return {
      author: 'Torin Varlack',
      readingLevel: 'YA / Ages 12+',
      genre: 'Young Adult · Mystery · Adventure',
      series: 'Cosomnia Universe',
      isbn: 'To be announced at preorder',
      description: c?.description || product?.description,
    };
  }
  if (title.includes('super bass')) {
    const c = BOOKS_CATALOG.find((b) => b.id === 'super-bass-heroes');
    return {
      author: 'Torin Varlack',
      readingLevel: 'Ages 8–11 · Grades 3–5',
      genre: 'Elementary · Adventure · Music',
      series: 'Super Bass Heroes',
      isbn: 'To be announced at preorder',
      description: c?.description || product?.description,
    };
  }
  return {
    author: 'Torin Varlack',
    readingLevel: 'To be announced',
    genre: 'To be announced',
    series: 'BassNotes Publishing House',
    isbn: 'To be announced at preorder',
    description: product?.description,
  };
}

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={n <= Math.round(rating) ? 'fill-secondary text-secondary' : 'text-border'} style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

function ReviewForm({ productId, productTitle, onSubmitted }) {
  const { isAuthed, user } = useAuth();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthed) {
    return (
      <div className="rounded-xl border border-border bg-muted/40 p-5 text-center text-sm text-muted-foreground">
        <Link to="/login" className="font-semibold text-primary underline-offset-4 hover:underline">Sign in</Link> to write a review.
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!body.trim()) return;
    setSubmitting(true);
    try {
      await pb.collection('book_reviews').create({
        product_id: productId,
        product_title: productTitle,
        rating,
        title: title.trim(),
        body: body.trim(),
        owner: user.id,
      });
      setTitle(''); setBody(''); setRating(5);
      onSubmitted();
    } catch (err) {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-card p-5">
      <h4 className="font-display text-lg font-semibold text-foreground">Write a review</h4>
      <div className="mt-3 flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Your rating:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
              <Star className={n <= rating ? 'fill-secondary text-secondary' : 'text-border'} style={{ width: 20, height: 20 }} />
            </button>
          ))}
        </div>
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Review title (optional)" className="mt-3 h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none focus:border-primary" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Share your thoughts…" required className="mt-3 min-h-[100px] w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
      <Button type="submit" disabled={submitting} className="mt-3 rounded-full bg-primary text-primary-foreground">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Review'}
      </Button>
    </form>
  );
}

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [wishlisted, setWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isAuthed, user } = useAuth();

  const loadReviews = useCallback(async (pid) => {
    try {
      const recs = await pb.collection('book_reviews').getFullList({
        filter: pb.filter('product_id = {:pid}', { pid }),
        sort: '-created',
      });
      setReviews(recs);
    } catch {
      setReviews([]);
    }
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      try {
        await addToCart(product, selectedVariant, quantity, selectedVariant.inventory_quantity);
        toast({ title: 'Added to cart', description: `${quantity} × ${product.title}` });
      } catch (err) {
        toast({ variant: 'destructive', title: 'Could not add to cart', description: err.message });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast]);

  const toggleWishlist = useCallback(async () => {
    if (!isAuthed) { navigate('/login'); return; }
    if (!product || !selectedVariant) return;
    try {
      if (wishlisted) {
        const existing = await pb.collection('wishlist').getFirstListItem(
          pb.filter('owner = {:o} && product_id = {:p}', { o: user.id, p: product.id })
        );
        await pb.collection('wishlist').delete(existing.id);
        setWishlisted(false);
        toast({ title: 'Removed from wishlist' });
      } else {
        await pb.collection('wishlist').create({
          product_id: product.id,
          variant_id: selectedVariant.id,
          product_title: product.title,
          cover_url: product.image || '',
          price_cents: selectedVariant.sale_price_in_cents ?? selectedVariant.price_in_cents,
          owner: user.id,
        });
        setWishlisted(true);
        toast({ title: 'Added to wishlist' });
      }
    } catch {
      // ignore
    }
  }, [isAuthed, user, product, selectedVariant, wishlisted, navigate, toast]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);
        let productWithQuantities = fetchedProduct;
        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id],
          });
          const qmap = new Map();
          quantitiesResponse.variants.forEach((v) => qmap.set(v.id, v.inventory_quantity));
          productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map((v) => ({ ...v, inventory_quantity: qmap.get(v.id) ?? v.inventory_quantity })),
          };
        } catch { /* ignore */ }
        setProduct(productWithQuantities);
        if (productWithQuantities.variants?.length > 0) {
          setSelectedVariant(productWithQuantities.variants[0]);
          trackEcommerceEvent({ event: EcommerceTrackingEvent.ViewItem, items: [{ product: productWithQuantities, variant: productWithQuantities.variants[0] }] });
        }
        loadReviews(fetchedProduct.id);

        // Related books
        try {
          const all = await getProducts({ limit: 20 });
          setRelated(all.products.filter((p) => p.id !== fetchedProduct.id).slice(0, 4));
        } catch { /* ignore */ }

        // Wishlist state
        if (isAuthed) {
          try {
            await pb.collection('wishlist').getFirstListItem(
              pb.filter('owner = {:o} && product_id = {:p}', { o: user.id, p: fetchedProduct.id })
            );
            setWishlisted(true);
          } catch { setWishlisted(false); }
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id, isAuthed, user, loadReviews]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-5xl px-6 pt-40">
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">This book could not be loaded.</p>
          <Link to="/bookstore" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Back to bookstore</Link>
        </div>
      </div>
    );
  }

  const meta = bookMeta(product);
  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant?.inventory_quantity ?? 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;
  const isDigital = /ebook|e-book|digital/i.test(selectedVariant?.title || '') || product.type?.value === 'service';
  const avgRating = reviews.length ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length : 0;

  return (
    <>
      <Helmet>
        <title>{product.title} — BassNotes Bookstore</title>
        <meta name="description" content={`${meta.description?.substring(0, 160) || product.title} by ${meta.author}. ${meta.genre}.`} />
      </Helmet>
      <Seo title={`${product.title} — BassNotes`} description={meta.description?.substring(0, 160) || product.title} image={product.image} siteName="BassNotes" />

      <div className="mx-auto max-w-6xl px-6 pt-40 pb-20">
        <Link to="/bookstore" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to bookstore
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          {/* Cover */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[0_30px_60px_-20px_rgba(10,61,98,0.3)]">
              <img src={product.image || placeholderImage} alt={product.title} className="w-full object-contain" />
              {product.ribbon_text && (
                <span className="absolute left-4 top-4 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">{product.ribbon_text}</span>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">{meta.series}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-primary md:text-4xl">{product.title}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{price}</span>
                {selectedVariant?.sale_price_in_cents && <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>}
              </div>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <Stars rating={avgRating} />
                  <span className="text-sm text-muted-foreground">({reviews.length})</span>
                </div>
              )}
            </div>

            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{meta.description}</p>

            {/* Book metadata grid */}
            <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
              <div className="flex items-center gap-3"><User className="h-4 w-4 shrink-0 text-primary" /><div><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Author</p><p className="text-sm font-medium text-foreground">{meta.author}</p></div></div>
              <div className="flex items-center gap-3"><GraduationCap className="h-4 w-4 shrink-0 text-primary" /><div><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Reading Level</p><p className="text-sm font-medium text-foreground">{meta.readingLevel}</p></div></div>
              <div className="flex items-center gap-3"><BookOpen className="h-4 w-4 shrink-0 text-primary" /><div><p className="text-[11px] uppercase tracking-wide text-muted-foreground">Genre</p><p className="text-sm font-medium text-foreground">{meta.genre}</p></div></div>
              <div className="flex items-center gap-3"><Hash className="h-4 w-4 shrink-0 text-primary" /><div><p className="text-[11px] uppercase tracking-wide text-muted-foreground">ISBN</p><p className="text-sm font-medium text-foreground">{meta.isbn}</p></div></div>
            </div>

            {/* Format selection */}
            {product.variants.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-foreground">Choose your format</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${selectedVariant?.id === variant.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-foreground hover:border-primary/50'}`}
                    >
                      {/ebook|e-book|digital/i.test(variant.title) ? <Download className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                      {variant.title}
                      <span className="text-muted-foreground">· {variant.sale_price_formatted ?? variant.price_formatted}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + actions */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-border">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-foreground hover:text-primary" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-foreground hover:text-primary" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
              </div>
              <Button onClick={handleAddToCart} disabled={!canAddToCart || !product.purchasable} className="rounded-full bg-primary px-7 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground hover:brightness-110">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button onClick={toggleWishlist} variant="outline" className="rounded-full border-border px-5 py-3">
                <Heart className={`h-4 w-4 ${wishlisted ? 'fill-destructive text-destructive' : ''}`} />
              </Button>
            </div>

            {isDigital && (
              <p className="mt-3 flex items-center gap-2 text-sm text-secondary"><Download className="h-4 w-4" /> Digital download — delivered to your library after purchase.</p>
            )}
            {isStockManaged && canAddToCart && product.purchasable && (
              <p className="mt-2 flex items-center gap-2 text-sm text-green-600"><CheckCircle className="h-4 w-4" /> {availableStock} in stock</p>
            )}
            {isStockManaged && !canAddToCart && (
              <p className="mt-2 flex items-center gap-2 text-sm text-amber-600"><XCircle className="h-4 w-4" /> Only {availableStock} left</p>
            )}
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> Secure checkout · SSL protected</p>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-primary">Customer Reviews</h2>
              {reviews.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <Stars rating={avgRating} size={18} />
                  <span className="text-sm text-muted-foreground">{avgRating.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                  No reviews yet. Be the first to share your thoughts.
                </div>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <Stars rating={r.rating} />
                      <span className="text-xs text-muted-foreground">{new Date(r.created).toLocaleDateString()}</span>
                    </div>
                    {r.title && <p className="mt-2 font-semibold text-foreground">{r.title}</p>}
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                ))
              )}
            </div>
            <ReviewForm productId={product.id} productTitle={product.title} onSubmitted={() => loadReviews(product.id)} />
          </div>
        </section>

        {/* Related books */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-display text-2xl font-semibold text-primary">Related Books</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group rounded-xl border border-border bg-card overflow-hidden transition hover:-translate-y-1 hover:border-primary/40">
                  <div className="aspect-[3/4] bg-muted/30"><img src={p.image || placeholderImage} alt={p.title} className="h-full w-full object-contain" /></div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">{p.title}</h3>
                    <p className="mt-1 text-sm font-bold text-primary">{p.price_formatted}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default ProductDetailPage;
