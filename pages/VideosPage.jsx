import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Clapperboard, Film, Play, Sparkles, ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import { COSOMNIA_BOOK_RELEASE_LABEL, DREAM_ON_RELEASE_LABEL } from '@/data/catalog';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';

// Scalable category registry. `id` is the filter key; add a category and it
// appears in the filter bar and any video tagged with it renders under it.
const CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'music-videos', label: 'Official Music Videos' },
    { id: 'book-trailers', label: 'Book Trailers' },
    { id: 'visualizers', label: 'Visualizers' },
    { id: 'interviews', label: 'Author Interviews' },
    { id: 'behind-the-scenes', label: 'Behind-the-Scenes' },
    { id: 'short-films', label: 'Short Films' },
    { id: 'super-bass-heroes', label: 'Super Bass Heroes' },
    { id: 'animation', label: 'Future Animation' },
];

// Scalable video registry. Add an object with a `youtubeId` to embed a real
// YouTube video. Slots without a `youtubeId` render a reserved placeholder.
const VIDEOS = [
    {
        id: 'cosomnia-song',
        title: 'Cosomnia — Dream On (Official Music Video)',
        category: 'music-videos',
        meta: `Cosomnia story world · ${DREAM_ON_RELEASE_LABEL}`,
        status: 'coming-soon',
        note: `Official music video embed loads here with ${DREAM_ON_RELEASE_LABEL}.`
    },
    {
        id: 'cosomnia-trailer',
        title: 'Cosomnia — Book Trailer',
        category: 'book-trailers',
        meta: `Cosomnia · ${COSOMNIA_BOOK_RELEASE_LABEL}`,
        status: 'coming-soon',
        note: `Book trailer embed loads here ahead of ${COSOMNIA_BOOK_RELEASE_LABEL}.`
    },
    {
        id: 'cosomnia-visualizer',
        title: 'Cosomnia — Visualizer',
        category: 'visualizers',
        meta: 'Cosomnia story world',
        status: 'planned',
        note: 'Visualizer embed takes this place when produced.',
    },
    {
        id: 'torin-interview',
        title: 'Torin Varlack — Author Interview',
        category: 'interviews',
        meta: 'The Author · The Educator · The Musician',
        status: 'planned',
        note: 'Author interview embed loads here when the feature is published.',
    },
    {
        id: 'cosomnia-bts',
        title: 'Cosomnia — Behind-the-Scenes',
        category: 'behind-the-scenes',
        meta: 'Writing, recording, and building the world',
        status: 'planned',
        note: 'Behind-the-scenes embed takes this place when produced.',
    },
    {
        id: 'cosomnia-short',
        title: 'Cosomnia — Short Film',
        category: 'short-films',
        meta: 'Story world expansion',
        status: 'planned',
        note: 'Short film embed loads here when the piece is released.',
    },
    {
        id: 'sbh-songs',
        title: 'Super Bass Heroes — Songs & Shorts',
        category: 'super-bass-heroes',
        meta: 'Coming 2027 · Music · Adventure · Imagination · Literacy',
        status: 'coming-soon',
        note: 'Super Bass Heroes video embeds take their place here as the world arrives.',
    },
    {
        id: 'sbh-animation',
        title: 'Future Animation',
        category: 'animation',
        meta: 'BassNotes story worlds · In development',
        status: 'planned',
        note: 'Future animation embeds load here as BassNotes expands into motion.',
    },
];

function VideoCard({ video }) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition duration-300 hover:border-primary/40">
            <div className="relative aspect-video w-full overflow-hidden bg-secondary/40">
                {video.youtubeId ? (
                    <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                        title={video.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted p-6 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
                            <Play className="h-6 w-6 text-primary" fill="currentColor" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-foreground">
                            {video.status === 'coming-soon' ? 'Coming soon' : 'Reserved'}
                        </p>
                        <p className="max-w-xs text-[11px] leading-relaxed text-muted-foreground">
                            {video.note}
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                    {CATEGORIES.find((c) => c.id === video.category)?.label}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold leading-snug tracking-tight">
                    {video.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{video.meta}</p>
            </div>
        </div>
    );
}

export default function VideosPage() {
    const [active, setActive] = useState('all');

    const filtered =
        active === 'all' ? VIDEOS : VIDEOS.filter((v) => v.category === active);

    return (
        <main>
            <Helmet>
                <title>Videos — Visual Storytelling | BassNotes LLC</title>
                <meta
                    name="description"
                    content="BassNotes video — official music videos, book trailers, visualizers, author interviews, behind-the-scenes, short films, Super Bass Heroes, and future animation. YouTube embeds as each release drops."
                />
            </Helmet>
            <Seo
                title="Videos — Visual Storytelling Behind the Stories"
                description="Official music videos, book trailers, visualizers, author interviews, behind-the-scenes, short films, Super Bass Heroes, and future animation from BassNotes."
                siteName="BassNotes LLC"
                url="/videos"
            />

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border/60 pb-16 pt-48 md:pb-20 md:pt-[14.5rem]">
                <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.15),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-5xl px-6">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Videos
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.02] tracking-tight">
                            Visual storytelling{' '}
                            <span className="italic text-primary">behind the stories.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            Music videos, book trailers, visualizers, interviews, and short films that expand
                            BassNotes story worlds beyond the page. YouTube embeds load as each release drops.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* FILTER + GRID */}
            <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                <Reveal>
                    <div className="flex flex-wrap gap-2.5">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => setActive(cat.id)}
                                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition ${
                                    active === cat.id
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/60 hover:text-foreground'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((video, i) => (
                        <Reveal key={video.id} delay={i * 0.05}>
                            <VideoCard video={video} />
                        </Reveal>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="mt-12 text-center text-sm text-muted-foreground">
                        No videos in this category yet — check back as releases drop.
                    </p>
                )}
            </section>

            {/* CLOSING CTA */}
            <section className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <Starfield density={28} />
                <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            More worlds, more{' '}
                            <span className="italic text-primary">motion.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
                            Cosomnia is the flagship experience. Super Bass Heroes is the next world coming soon —
                            with its own songs, shorts, and animation on the way.
                        </p>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/music" className={PRIMARY_BTN}>
                                <Clapperboard className="h-4 w-4" />
                                Explore the Music
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/cosomnia#preorder" className={GHOST_BTN}>
                                Cosomnia Coming Soon
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
