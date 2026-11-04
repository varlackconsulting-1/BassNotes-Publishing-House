import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, BookOpen, Headphones, Loader2, Music2, Play, ShoppingBag } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import CosomniaCover, { COVER_URL, COVER_3D_URL } from '@/components/site/CosomniaCover';
import pocketbaseClient from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { COSOMNIA_BOOK_RELEASE_LABEL, DREAM_ON_RELEASE_LABEL } from '@/data/catalog';
const PRIMARY_BTN = 'inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto';
const GHOST_BTN = 'inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98] sm:w-auto';
const STREAM_BTN = 'inline-flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-border/80 bg-secondary/30 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground';
const STREAM_PLACES = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'];
function CampaignSignup() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  async function onSubmit(e) {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      toast.error('Please enter your first name and email.');
      return;
    }
    setStatus('loading');
    try {
      await pocketbaseClient.collection('newsletter_signups').create({
        first_name: firstName.trim(),
        email: email.trim().toLowerCase(),
        source: 'cosomnia-campaign'
      });
      setStatus('done');
      setFirstName('');
      setEmail('');
      toast.success('You are on the Cosomnia list.');
    } catch (err) {
      setStatus('idle');
      const msg = err?.data?.data?.email?.message || err?.message || 'Something went wrong. Please try again.';
      toast.error(typeof msg === 'string' ? msg : 'That email may already be on the list.');
    }
  }
  return <form onSubmit={onSubmit} className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:gap-4">
            <label className="sr-only" htmlFor="cos-first-name">
                First name
            </label>
            <input id="cos-first-name" name="first_name" type="text" autoComplete="given-name" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} className="h-12 rounded-full border border-border bg-secondary/40 px-5 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary focus:ring-2" required />
            <label className="sr-only" htmlFor="cos-email">
                Email
            </label>
            <input id="cos-email" name="email" type="email" autoComplete="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="h-12 rounded-full border border-border bg-secondary/40 px-5 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary focus:ring-2" required />
            <button type="submit" className={PRIMARY_BTN} disabled={status === 'loading'}>
                {status === 'loading' ? <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Joining…
                    </> : <>
                        Join the Cosomnia List
                        <ArrowRight className="h-4 w-4" />
                    </>}
            </button>
        </form>;
}
export default function CosomniaPage() {
  return <main>
            <Helmet>
                <title>Cosomnia — Dream....On | BassNotes</title>
                <meta name="description" content={`Cosomnia by Torin Varlack. ${DREAM_ON_RELEASE_LABEL}. Cosomnia book: ${COSOMNIA_BOOK_RELEASE_LABEL}. Dream....On`} />
            </Helmet>
            <Seo title="Cosomnia — Dream....On" description={`A mysterious, technology-driven young adult adventure. ${DREAM_ON_RELEASE_LABEL}. Cosomnia book: ${COSOMNIA_BOOK_RELEASE_LABEL}.`} siteName="BassNotes" image={COVER_URL} url="/cosomnia" />

            {/* HERO — conversion first, mobile-first */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205_82%_95%),hsl(var(--background))_65%)]" />
                <Starfield density={70} />
                <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-14 pt-36 text-center sm:px-6 md:pb-20 md:pt-[12.5rem]">
                    <h1 className="font-cosomnia text-[clamp(2.75rem,14vw,6.5rem)] leading-[0.92] text-primary"><em>Cosomnia</em></h1>
                    <div className="relative mx-auto mt-8 w-[min(100%,16.5rem)] sm:mt-10 sm:w-64 md:w-72">
                        <div className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,hsl(210_80%_50%/0.28),transparent_70%)] blur-2xl" />
                        <CosomniaCover variant="3d" className="relative border-0 shadow-[0_40px_70px_-20px_rgba(0,0,0,0.85)]" />
                    </div>

                    <div className="mt-8 w-full max-w-md space-y-2 sm:mt-10">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground sm:text-xs sm:tracking-[0.28em]">
                            Cosomnia book — {COSOMNIA_BOOK_RELEASE_LABEL}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground sm:text-xs sm:tracking-[0.28em]">
                            Dream On — {DREAM_ON_RELEASE_LABEL}
                        </p>
                    </div>

                    <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-lg sm:flex-row sm:justify-center">
                        <a href="#preorder" className={PRIMARY_BTN}>
                            Book Coming Soon
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="#watch" className={GHOST_BTN}>
                            Watch / Listen
                            <Play className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Discover the story */}
            <section id="story" className="section-cream">
                <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 md:py-24">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(28_80%_38%)]">
                            Discover the story
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-6 text-lg leading-relaxed text-[hsl(250_18%_28%)] md:text-xl">
                            A mysterious, technology-driven young adult adventure that challenges perception,
                            exposes buried truths, and tests the courage to see reality.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <a href="#preorder" className={`${PRIMARY_BTN} mt-10 !w-auto`}>
                            Book Coming Soon
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </Reveal>
                </div>
            </section>

            {/* Watch */}
            <section id="watch" className="relative border-y border-border/60">
                <div className="absolute inset-0 bg-muted" />
                <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 md:py-24">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <Play className="h-3.5 w-3.5" />
                            Watch
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-4 text-center font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Official video
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="relative mt-10 aspect-video overflow-hidden rounded-xl border border-border/70 bg-secondary/40 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
                            {/* Embed slot — replace src when the official video goes live in 2026 */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted p-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                                    <Play className="h-7 w-7 text-primary" fill="currentColor" />
                                </div>
                                <p className="text-sm font-bold uppercase tracking-[0.28em] text-foreground sm:text-base">
                                    Dream On video — {DREAM_ON_RELEASE_LABEL}
                                </p>
                                <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
                                    Music video, visualizer, or trailer embeds here when the release drops.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Listen */}
            <section id="listen" className="relative">
                <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6 md:py-24">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <Headphones className="h-3.5 w-3.5" />
                            Listen
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-4 text-center font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Dream On — Cosomnia song
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
                            {DREAM_ON_RELEASE_LABEL}. Streaming links unlock the moment it goes live.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <div className="mt-10 overflow-hidden rounded-2xl border border-border/70 bg-card">
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative aspect-square w-full shrink-0 bg-muted sm:w-48 md:w-56">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
                                        <Music2 className="h-9 w-9 text-primary" />
                                        <p className="font-cosomnia text-lg tracking-wide">Cosomnia</p>
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                            Dream On
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
                                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                                        Stream when available
                                    </p>
                                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                        {STREAM_PLACES.map(place => <button key={place} type="button" disabled className={STREAM_BTN} title="Link opens when the song releases">
                                                {place}
                                            </button>)}
                                    </div>
                                    <p className="mt-3 text-center text-[11px] text-muted-foreground sm:text-left">
                                        Placeholders ready — destinations activate with {DREAM_ON_RELEASE_LABEL}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Preorder */}
            <section id="preorder" className="relative overflow-hidden border-y border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <Starfield density={35} />
                <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 md:py-28">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Coming Soon · 2026</p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                            Choose how you want to experience Cosomnia
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="mx-auto mt-10 w-40 sm:w-48">
                            <img src={COVER_3D_URL} alt="Cosomnia by Torin Varlack — official book cover" className="h-auto w-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]" loading="lazy" />
                        </div>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3">
                            <button type="button" disabled className={PRIMARY_BTN} title="Amazon preorder link activates when the listing goes live">
                                Preorders Coming Soon
                                <ShoppingBag className="h-4 w-4" />
                            </button>
                            <button type="button" disabled className={GHOST_BTN} title="Direct checkout opens once BassNotes fulfillment is configured">
                                Preorders Coming Soon
                                <BookOpen className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-muted-foreground">
                            Preorder destinations unlock when retail and direct fulfillment go live. Cosomnia is
                            coming soon in 2026 — join the list below to get first access.
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <ul className="mx-auto mt-10 max-w-sm space-y-3 text-left text-sm text-foreground/90">
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>
                                    <strong className="font-semibold">Dream On</strong> — {DREAM_ON_RELEASE_LABEL}
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>
                                    <strong className="font-semibold">Cosomnia book</strong> — {COSOMNIA_BOOK_RELEASE_LABEL}
                                </span>
                            </li>
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* Creator */}
            <section className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 md:py-20">
                <Reveal>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                        The creator
                    </p>
                </Reveal>
                <Reveal delay={0.06}>
                    <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                        Torin Varlack
                    </h2>
                </Reveal>
                <Reveal delay={0.1}>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Author · Educator · Musician · Storyteller
                    </p>
                </Reveal>
                <Reveal delay={0.14}>
                    <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                        Torin Varlack writes and builds story worlds under BassNotes — books, music, and media made
                        to spark literacy, imagination, and culture. Cosomnia is the next chapter.
                    </p>
                </Reveal>
            </section>

            {/* Community + email */}
            <section id="join" className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <div className="relative mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 md:py-28">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl">
                            The story is just beginning.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-4 font-display text-xl font-light italic text-foreground/90 md:text-2xl">
                            Dream....On
                        </p>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground"><span style={{
              fontSize: "16px",
              lineHeight: "normal"
            }}>Be first for release news, exclusive drops, and the moment preorders open.</span></p>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <CampaignSignup />
                    </Reveal>
                    <Reveal delay={0.22}>
                        <a href="#preorder" className={`${GHOST_BTN} mt-10 !w-auto`}>
                            Book Coming Soon
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </Reveal>
                </div>
            </section>
        </main>;
}