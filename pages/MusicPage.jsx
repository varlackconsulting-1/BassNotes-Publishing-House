import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    ArrowRight,
    BookOpen,
    Disc3,
    Headphones,
    Mic2,
    Music2,
    Play,
    Radio,
    ShoppingBag,
    Sparkles,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import { DREAM_ON_RELEASE_LABEL } from '@/data/catalog';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';
const STREAM_BTN =
    'inline-flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-border/80 bg-secondary/30 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground';

const STREAM_PLACES = ['Spotify', 'Apple Music', 'YouTube Music', 'Amazon Music'];

const MUSIC_CATEGORIES = [
    {
        n: '01',
        icon: Disc3,
        label: 'Scores',
        body: 'Original scores for BassNotes story worlds and animated projects.',
    },
    {
        n: '02',
        icon: Mic2,
        label: 'Character Themes',
        body: 'Signature themes tied to each character in the BassNotes universe.',
    },
    {
        n: '03',
        icon: Radio,
        label: 'Singles & EPs',
        body: 'Standalone releases and instrumentals complementing every book.',
    },
];

// Scalable release registry — add a release object and it renders in full.
// `status` controls the slot treatment: 'featured' | 'upcoming' | 'planned'.
const RELEASES = [
    {
        status: 'featured',
        title: 'Dream On',
        tag: 'Coming Soon',
        release: DREAM_ON_RELEASE_LABEL,
        kind: 'Dream On · Cosomnia story world',
        body: 'Every story world at BassNotes comes with its own sonic identity. The Cosomnia song is intentionally created to serve the story and expand the story world — with purpose, emotion, and intention.',
    },
    {
        status: 'upcoming',
        title: 'Super Bass Heroes — Songs',
        tag: 'Coming soon',
        kind: 'Music · Adventure · Imagination · Literacy',
        body: 'A fun, music-filled journey that teaches teamwork, confidence, and the importance of using your talents to help others. Original songs arrive with the Super Bass Heroes world.',
        icon: Sparkles,
    },
];

export default function MusicPage() {
    const featured = RELEASES.find((r) => r.status === 'featured');
    const upcoming = RELEASES.filter((r) => r.status !== 'featured');

    return (
        <main>
            <Helmet>
                <title>Music — The Sound Behind the Stories | BassNotes LLC</title>
                <meta
                    name="description"
                    content={`BassNotes creates original music connected to its books, characters, and story worlds. Featured release: Dream On — ${DREAM_ON_RELEASE_LABEL}. Streaming, YouTube, music videos, and future releases.`}
                />
            </Helmet>
            <Seo
                title="Music — The Sound Behind the Stories"
                description={`BassNotes creates original music connected to its books, characters, and story worlds. Featured release: Dream On — ${DREAM_ON_RELEASE_LABEL}.`}
                siteName="BassNotes LLC"
                url="/music"
            />

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border/60 pb-16 pt-48 md:pb-20 md:pt-[14.5rem]">
                <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.15),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-5xl px-6">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Music
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.02] tracking-tight">
                            The sound behind{' '}
                            <span className="italic text-primary">the stories.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            BassNotes creates original music connected to its books, characters, and story worlds.
                            Every property arrives with its own sonic identity — written alongside the manuscript,
                            released on its own.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* FEATURED RELEASE — COSOMNIA ORIGINAL SONG */}
            {featured && (
                <section id="featured" className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-muted" />
                    <Starfield density={40} />
                    <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                        <Reveal>
                            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                <span className="h-px w-10 bg-primary/60" />
                                {featured.tag}
                            </p>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                                <span className="italic text-primary">Dream On</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                                {featured.release}
                            </p>
                        </Reveal>

                        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
                            {/* Cover artwork + streaming */}
                            <div className="lg:col-span-5">
                                <Reveal>
                                    <figure>
                                        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/70 bg-muted shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                                                <Music2 className="h-10 w-10 text-primary" />
                                                <p className="font-cosomnia text-2xl tracking-wide">Cosomnia</p>
                                                <p className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                                                    Official song artwork
                                                </p>
                                                <p className="mt-2 max-w-[14rem] text-[11px] leading-relaxed text-muted-foreground/80">
                                                    Final cover artwork takes this place when the release drops.
                                                </p>
                                            </div>
                                        </div>
                                        <figcaption className="mt-4 text-xs text-muted-foreground">
                                            Cover artwork — reserved for the final asset.
                                        </figcaption>
                                    </figure>
                                </Reveal>

                                <Reveal delay={0.1}>
                                    <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-card">
                                        <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
                                            <Headphones className="h-4 w-4 text-primary" />
                                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                                                Listen — stream when available
                                            </p>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid gap-2 sm:grid-cols-2">
                                                {STREAM_PLACES.map((place) => (
                                                    <button
                                                        key={place}
                                                        type="button"
                                                        disabled
                                                        className={STREAM_BTN}
                                                        title="Link opens when the song releases"
                                                    >
                                                        {place}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                                                Streaming destinations activate with {DREAM_ON_RELEASE_LABEL}.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Embedded music / YouTube / music video + actions */}
                            <div className="lg:col-span-7">
                                <Reveal delay={0.06}>
                                    <div className="relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-secondary/40 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
                                        {/* YouTube / music video embed slot — replace with official embed when Dream On releases */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted p-6 text-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                                                <Play className="h-7 w-7 text-primary" fill="currentColor" />
                                            </div>
                                            <p className="text-sm font-bold uppercase tracking-[0.28em] text-foreground sm:text-base">
                                                Dream On video — {DREAM_ON_RELEASE_LABEL}
                                            </p>
                                            <p className="max-w-sm text-xs text-muted-foreground sm:text-sm">
                                                YouTube embed and music video load here when the official release
                                                drops.
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>

                                <Reveal delay={0.14}>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <button type="button" disabled className={PRIMARY_BTN} title={`Video unlocks with ${DREAM_ON_RELEASE_LABEL}`}>
                                            <Play className="h-4 w-4" />
                                            Watch
                                        </button>
                                        <button type="button" disabled className={GHOST_BTN} title={`Streaming unlocks with ${DREAM_ON_RELEASE_LABEL}`}>
                                            <Headphones className="h-4 w-4" />
                                            Listen
                                        </button>
                                        <Link to="/cosomnia" className={GHOST_BTN}>
                                            <BookOpen className="h-4 w-4" />
                                            Discover the Book
                                        </Link>
                                        <Link to="/cosomnia#preorder" className={PRIMARY_BTN}>
                                            <ShoppingBag className="h-4 w-4" />
                                            Cosomnia Coming Soon
                                        </Link>
                                    </div>
                                </Reveal>

                                <Reveal delay={0.2}>
                                    <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                        {featured.body}
                                    </p>
                                </Reveal>

                                {/* Lyrics-related promotional content slot */}
                                <Reveal delay={0.24}>
                                    <div className="mt-8 rounded-2xl border border-dashed border-border/70 bg-card/50 p-6">
                                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                                            Lyrics & story notes
                                        </p>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                            Lyrics, lyric videos, and behind-the-song story notes will be featured
                                            here alongside the release — connecting every line back to the world of
                                            Cosomnia.
                                        </p>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* MUSIC CATEGORIES */}
            <section className="border-t border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            The sound
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            Original music,{' '}
                            <span className="italic text-primary">produced by Torin.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            Every story world at BassNotes comes with its own sonic identity — original scores,
                            character themes, and standalone releases written, produced, and performed in-house. Beats
                            built in Houston, for the page and the screen.
                        </p>
                    </Reveal>
                    <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-3">
                        {MUSIC_CATEGORIES.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={item.label} delay={i * 0.07}>
                                    <div className="h-full bg-card p-8 transition-colors hover:bg-secondary/40">
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </span>
                                            <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground">
                                                {item.n}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                                            {item.label}
                                        </h3>
                                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                    <Reveal delay={0.16}>
                        <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Original soundtracks in development
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* FUTURE RELEASES */}
            <section id="upcoming" className="border-t border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Coming next
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-5 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Future BassNotes music
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                            Additional songs, scores, and companion albums take their place here as each release is
                            produced — including Super Bass Heroes songs and future BassNotes music releases.
                        </p>
                    </Reveal>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {upcoming.map((item, i) => {
                            const Icon = item.icon || Music2;
                            return (
                                <Reveal key={item.title} delay={i * 0.08}>
                                    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dashed border-border/80 bg-card/60 p-8 transition duration-300 hover:border-primary/40">
                                        <div className="flex items-center justify-between">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </span>
                                            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                                            {item.kind}
                                        </p>
                                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                            {item.body}
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}

                        {/* Reserved extensibility slot */}
                        <Reveal delay={0.16}>
                            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-secondary/30 p-8 text-center">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground">
                                    <Music2 className="h-5 w-5" strokeWidth={1.5} />
                                </span>
                                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                    More releases ahead
                                </p>
                                <p className="mt-3 max-w-[16rem] text-xs leading-relaxed text-muted-foreground/80">
                                    Songs, scores, and companion albums take their place here as each is produced.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <Starfield density={28} />
                <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            The story is just{' '}
                            <span className="italic text-primary">beginning.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/cosomnia#preorder" className={PRIMARY_BTN}>
                                Cosomnia Coming Soon
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
