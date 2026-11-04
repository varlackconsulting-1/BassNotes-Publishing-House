import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import CosomniaCover, { COVER_3D_URL } from '@/components/site/CosomniaCover';
import {
    BOOKS_CATALOG,
    COSOMNIA_BOOK_RELEASE_LABEL,
    SERIES_INFO,
    SUPER_BASS_ART,
} from '@/data/catalog';

const STORE_URL = 'https://store.bassnotespublishing.com/';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';

/**
 * Catalog architecture — add new titles here.
 * status: 'featured' | 'coming' | 'catalog'
 * art: image URL or null (uses CosomniaCover when slug === 'cosomnia')
 */
const BOOKS = [
    {
        id: 'cosomnia',
        status: 'featured',
        title: 'Cosomnia',
        tagline: 'Dream....On',
        releaseLabel: 'Book',
        releaseDate: COSOMNIA_BOOK_RELEASE_LABEL,
        author: 'Torin Varlack',
        description:
            'A mysterious young-adult adventure that lives in the hours when the world goes quiet and the mind refuses to — dreams, memory, and the people who meet us there. The first original property from BassNotes Publishing House, opening a larger universe of story, sound, and film.',
        art: COVER_3D_URL,
        artAlt: 'Cosomnia by Torin Varlack — official book cover',
        useCosomniaCover: true,
        primaryCta: { label: 'Coming Soon', to: '/cosomnia' },
        secondaryCta: { label: 'Discover Cosomnia', to: '/cosomnia' },
    },
    {
        id: 'super-bass-heroes',
        status: 'coming',
        title: 'Super Bass Heroes',
        tagline: 'Coming 2027',
        releaseLabel: null,
        releaseDate: null,
        author: 'Torin Varlack',
        description:
            'An original story universe that combines music, adventure, imagination, and literacy — where young heroes, bold sound, and fearless storytelling invite readers to play along and grow with every page.',
        art: SUPER_BASS_ART,
        artAlt: 'Super Bass Heroes — illustrated cover art by Torin Varlack',
        useCosomniaCover: false,
        primaryCta: { label: 'Explore the Series', to: '/super-bass-heroes' },
        secondaryCta: null,
    },
];

function FeaturedBook({ book }) {
    return (
        <section className="relative overflow-hidden border-t border-border/40">
            <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 20% 40%, hsl(255 45% 30% / 0.35), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 70%, hsl(38 88% 40% / 0.12), transparent 55%)',
                }}
                aria-hidden="true"
            />
            <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:gap-16 md:py-28 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Reveal>
                        <div className="relative mx-auto w-full max-w-sm">
                            {book.useCosomniaCover ? (
                                <CosomniaCover
                                    variant="3d"
                                    className="mx-auto w-full max-w-[280px] bg-transparent sm:max-w-[320px]"
                                />
                            ) : (
                                <div className="relative mx-auto w-full max-w-[320px] overflow-hidden">
                                    <img
                                        src={book.art}
                                        alt={book.artAlt}
                                        className="mx-auto h-auto w-full bg-transparent object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </div>
                    </Reveal>
                </div>

                <div className="lg:col-span-7">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Featured</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-4 font-cosomnia text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
                            {book.title}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-4 font-display text-2xl italic text-foreground/90 md:text-3xl">
                            {book.tagline}
                        </p>
                    </Reveal>
                    {book.releaseDate && (
                        <Reveal delay={0.1}>
                            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                                <span className="text-foreground/80">{book.releaseLabel}:</span>{' '}
                                <span className="font-semibold text-primary">{book.releaseDate}</span>
                            </p>
                        </Reveal>
                    )}
                    <Reveal delay={0.12}>
                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {book.description}
                        </p>
                    </Reveal>
                    {book.author && (
                        <Reveal delay={0.14}>
                            <p className="mt-4 text-sm tracking-wide text-muted-foreground">
                                By <span className="text-foreground">{book.author}</span>
                            </p>
                        </Reveal>
                    )}
                    <Reveal delay={0.16}>
                        <div className="mt-10 flex flex-wrap gap-4">
                            {book.primaryCta && (
                                <Link to={book.primaryCta.to} className={PRIMARY_BTN}>
                                    {book.primaryCta.label}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                            {book.secondaryCta && (
                                <Link to={book.secondaryCta.to} className={GHOST_BTN}>
                                    {book.secondaryCta.label}
                                </Link>
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

function ComingSoonBook({ book, index }) {
    return (
        <article className="relative overflow-hidden border-t border-border/40">
            <div
                className={`relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:gap-16 md:py-28 lg:grid-cols-12 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
            >
                <div className="lg:col-span-7">
                    <Reveal>
                        <div className="relative mx-auto w-full max-w-2xl">
                            <img
                                src={book.art}
                                alt={book.artAlt}
                                className="mx-auto h-auto w-full scale-105 bg-transparent object-contain drop-shadow-[0_38px_58px_rgba(0,0,0,0.58)] transition duration-500 hover:scale-110"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </Reveal>
                </div>
                <div className="lg:col-span-6">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Coming soon</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                            {book.title}
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            {book.tagline}
                        </p>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                            {book.description}
                        </p>
                    </Reveal>
                    {book.primaryCta && (
                        <Reveal delay={0.16}>
                            <div className="mt-10">
                                <Link to={book.primaryCta.to} className={PRIMARY_BTN}>
                                    {book.primaryCta.label}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Reveal>
                    )}
                </div>
            </div>
        </article>
    );
}

function CatalogEntry({ book, index }) {
    return (
        <article className="group grid items-center gap-10 border-t border-border/40 py-16 md:grid-cols-12 md:gap-12 md:py-20">
            <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <Reveal>
                    {book.art ? (
                        <img
                            src={book.art}
                            alt={book.artAlt || book.title}
                            className="mx-auto h-auto w-full max-w-xs bg-transparent object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)] transition duration-500 group-hover:-translate-y-1"
                            loading="lazy"
                        />
                    ) : (
                        <div className="mx-auto flex aspect-[2/3] w-full max-w-xs items-center justify-center rounded-md border border-dashed border-border/60 bg-transparent">
                            <span className="px-6 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                Cover forthcoming
                            </span>
                        </div>
                    )}
                </Reveal>
            </div>
            <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <Reveal>
                    <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{book.title}</h3>
                </Reveal>
                {book.tagline && (
                    <Reveal delay={0.05}>
                        <p className="mt-3 text-sm uppercase tracking-[0.25em] text-primary">{book.tagline}</p>
                    </Reveal>
                )}
                {book.description && (
                    <Reveal delay={0.08}>
                        <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">{book.description}</p>
                    </Reveal>
                )}
                {(book.primaryCta || book.secondaryCta) && (
                    <Reveal delay={0.12}>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {book.primaryCta && (
                                <Link to={book.primaryCta.to} className={PRIMARY_BTN}>
                                    {book.primaryCta.label}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                            {book.secondaryCta && (
                                <Link to={book.secondaryCta.to} className={GHOST_BTN}>
                                    {book.secondaryCta.label}
                                </Link>
                            )}
                        </div>
                    </Reveal>
                )}
            </div>
        </article>
    );
}

export default function BooksPage() {
    const featured = BOOKS.filter((b) => b.status === 'featured');
    const coming = BOOKS.filter((b) => b.status === 'coming');
    const catalog = BOOKS.filter((b) => b.status === 'catalog');

    return (
        <main className="relative bg-background">
            <Helmet>
                <title>Books — BassNotes Publishing House</title>
                <meta
                    name="description"
                    content="Stories that live beyond the page. Discover Cosomnia and Super Bass Heroes from BassNotes Publishing House — original books uniting music, adventure, and literacy."
                />
            </Helmet>
            <Seo
                title="Books — BassNotes Publishing House"
                description="Stories that live beyond the page. Cosomnia and Super Bass Heroes from BassNotes Publishing House."
                image={COVER_3D_URL}
                siteName="BassNotes"
            />

            <div className="h-32 md:h-[10.5rem]" aria-hidden="true" />

            {featured.map((book) => (
                <FeaturedBook key={book.id} book={book} />
            ))}

            {coming.map((book, i) => (
                <ComingSoonBook key={book.id} book={book} index={i} />
            ))}

            {catalog.length > 0 && (
                <section className="border-t border-border/40">
                    <div className="mx-auto max-w-6xl px-6">
                        <Reveal>
                            <div className="pt-32 md:pt-[10.5rem]">
                                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                    The catalog
                                </p>
                                <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                                    More from BassNotes
                                </h2>
                            </div>
                        </Reveal>
                        {catalog.map((book, i) => (
                            <CatalogEntry key={book.id} book={book} index={i} />
                        ))}
                    </div>
                </section>
            )}

            {/* Full cover grid */}
            <section className="border-t border-border/40 bg-secondary/10">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">All titles</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Book cover gallery
                        </h2>
                    </Reveal>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {BOOKS_CATALOG.map((book, i) => (
                            <Reveal key={`grid-${book.id}`} delay={i * 0.08}>
                                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40">
                                    <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-background/50 p-8">
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="max-h-full w-auto object-contain drop-shadow-[0_28px_48px_rgba(0,0,0,0.55)]"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="font-display text-2xl font-medium">{book.title}</h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                                            {book.shortDescription}
                                        </p>
                                        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                            {book.genre} · {book.readingLevel}
                                        </p>
                                        <Link to={book.detailsPath} className={`${GHOST_BTN} mt-6 self-start`}>
                                            View Details
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Series / levels */}
            <section className="border-t border-border/40">
                <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Series, genres & reading levels
                        </h2>
                    </Reveal>
                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        {SERIES_INFO.map((s, i) => (
                            <Reveal key={s.id} delay={i * 0.08}>
                                <div className="rounded-2xl border border-border/60 bg-card/30 p-8">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                                        {s.level}
                                    </p>
                                    <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                    <Reveal delay={0.15}>
                        <div className="mt-12 text-center">
                            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={PRIMARY_BTN}>
                                Shop the store
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Quiet close — room to grow */}
            <section className="border-t border-border/40">
                <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <p className="font-display text-2xl italic leading-snug text-foreground/90 md:text-3xl">
                            Every title opens another door in the BassNotes universe.
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-6 text-muted-foreground">
                            New books and series will appear here as they are ready — same stage, larger story.
                        </p>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <Link to="/cosomnia" className={`${PRIMARY_BTN} mt-10`}>
                            Enter Cosomnia
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
