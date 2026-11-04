import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, Download, BookOpen, Lock, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { useAuth } from '@/contexts/AuthContext';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition hover:brightness-110 active:scale-[0.98]';

export default function LibraryPage() {
  const { user, isAuthed } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthed) { navigate('/login?redirect=/account/library'); return; }
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const recs = await pb.collection('digital_purchases').getFullList({
          filter: pb.filter('owner = {:o}', { o: user.id }),
          sort: '-created',
        });
        if (active) setItems(recs);
      } catch { /* ignore */ }
      finally { if (active) setLoading(false); }
    })();
    return () => { active = false; };
  }, [isAuthed, user, navigate]);

  const download = (item) => {
    if (!item.file) { toast.info('Digital file will be available once uploaded by BassNotes.'); return; }
    const url = pb.files.getURL(item, item.file);
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-[100dvh] bg-muted/20 pt-36">
      <Helmet>
        <title>My Library — BassNotes Bookstore</title>
        <meta name="description" content="Download your purchased BassNotes eBooks securely from your personal library." />
      </Helmet>
      <Seo title="My Library — BassNotes" description="Download your purchased BassNotes eBooks." siteName="BassNotes" />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">My Library</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Your digital collection</h1>
          <p className="mt-2 text-sm text-muted-foreground">Securely download every eBook you have purchased. Files are protected and accessible only from your account.</p>
        </Reveal>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/40" />
              <p className="mt-4 font-semibold text-foreground">Your library is empty</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">eBooks you purchase appear here for instant, secure download.</p>
              <Link to="/bookstore" className={`${BTN} mt-5`}>Shop eBooks <ArrowRight className="h-4 w-4" /></Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                  {item.cover_url ? (
                    <img src={item.cover_url} alt={item.product_title} className="h-28 w-20 shrink-0 rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-lg bg-muted"><BookOpen className="h-8 w-8 text-muted-foreground/40" /></div>
                  )}
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-display text-lg font-semibold text-primary">{item.product_title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Added {new Date(item.created).toLocaleDateString()}</p>
                    <div className="mt-auto pt-3">
                      <button onClick={() => download(item)} className={BTN}>
                        {item.file ? <><Download className="h-4 w-4" /> Download</> : <><Lock className="h-4 w-4" /> File pending</>}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p>Your digital files are stored securely and protected from public access. Downloads are available only after successful payment, from your authenticated account.</p>
        </div>
      </div>
    </main>
  );
}
