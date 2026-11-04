import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import CosomniaCover, { COVER_3D_URL } from '@/components/site/CosomniaCover';
import {
    BOOKS_CATALOG,
    COSOMNIA_BOOK_RELEASE_LABEL,
    SUPER_BASS_ART,
} from '@/data/catalog';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';

const cosomnia = BOOKS_CATALOG.find((b) => b.id === 'cosomnia');
const superBass = BOOKS_CATALOG.find((b) => b.id === 'super-bass-heroes');

export default function StorePage() {
    return (
        <main className="relative bg-background">
            <Helmet>
                <title>Store — BassNotes Publishing House</title>
                <meta
                    name="description"
                    content="The BassNotes bookstore — Cosomnia is coming soon in 2026, with Super Bass Heroes to follow. An editorial storefront preparing for a full WooCommerce-powered checkout."
                />
            </Helmet>
            <Seo
                title="Store — BassNotes Publishing House"
                description="The BassNotes bookstore. Cosomnia coming soon in 2026, Super Bass Heroes next. WooCommerce-ready storefront at /store."
                image={COVER_3D_URL}
                siteName="BassNotes"
            />

            {/* Editorial masthead hero */}
            <section className="relative isolate overflow-hidden border-b border-border/40">
                <Starfield density={28} className="opacity-60" />
                <div
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                        background:
                            'radial-gradient(ellipse 70% 50% at 30% 20%, hsl(255 45% 28% / 0.30), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, hsl(38 80% 38% / 0.10), transparent 55%)',
                    }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-44 text-center md:pb-28 md:pt-[14.5rem]">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            The Bookstore
                            <span className="h-px w-10 bg-primary/60" />
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className="mt-6 font-display text-5xl font-medium leading-[1.04] tracking-tight md:text-7xl">
                            First editions, direct from the house
                        </h1>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <p className="mx-auto mt-8 font-display text-5xl font-bold uppercase leading-none tracking-[0.08em] text-primary sm:text-6xl md:text-8xl">
                            COMING SOON
                        </p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/cosomnia#preorder" className={PRIMARY_BTN}>
                                Cosomnia — Coming Soon
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/books" className={GHOST_BTN}>
                                Browse the catalog
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Status ledger */}
            <section className="border-b border-border/40 bg-secondary/20">
                <div className="mx-auto max-w-5xl px-6 py-10 md:py-12">
                    <Reveal>
                        <div className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-3">
                            {[
                                {
                                    icon: Clock,
                                    label: 'Release status',
                                    value: 'Coming Soon · 2026',
                                    sub: 'Cosomnia — Vol. 01',
                                },
                                {
                                    icon: BookOpen,
                                    label: 'Next on the shelf',
                                    value: 'Super Bass Heroes',
                                    sub: 'Vol. 02 · Coming 2027',
                                },
                                {
                                    icon: Sparkles,
                                    label: 'Checkout',
                                    value: 'Reserved',
                                    sub: 'WooCommerce-ready at /store',
                                },
                            ].map((item) => (
                                <div key={item.label} className="bg-card/50 p-6">
                                    <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 font-display text-lg font-medium tracking-tight text-foreground">
                                        {item.value}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Featured editorial spread — Cosomnia */}
            <section id="cosomnia" className="relative overflow-hidden border-b border-border/40">
                <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 55% at 25% 45%, hsl(255 45% 30% / 0.30), transparent 60%), radial-gradient(ellipse 45% 45% at 85% 70%, hsl(38 88% 40% / 0.12), transparent 55%)',
                    }}
                    aria-hidden="true"
                />
                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:gap-16 md:py-28 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <div className="relative mx-auto w-full max-w-sm">
                                <CosomniaCover
                                    variant="3d"
                                    className="mx-auto w-full max-w-[300px] bg-transparent sm:max-w-[340px]"
                                />
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                Featured release
                            </p>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 className="mt-4 font-cosomnia text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
                                {cosomnia.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="mt-4 font-display text-2xl italic text-foreground/90 md:text-3xl">
                                {cosomnia.tagline}
                            </p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <div className="mt-6 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                                    <Clock className="h-3 w-3" />
                                    {COSOMNIA_BOOK_RELEASE_LABEL}
                                </span>
                                <span className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    {cosomnia.volume}
                                </span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                                {cosomnia.description}
                            </p>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <p className="mt-4 text-sm tracking-wide text-muted-foreground">
                                By <span className="text-foreground">{cosomnia.author}</span> ·{' '}
                                {cosomnia.genre}
                            </p>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <div className="mt-8 flex items-baseline gap-4">
                                <span className="font-display text-4xl text-foreground/90">TBA</span>
                                <span className="text-sm text-muted-foreground">
                                    Pricing announced at preorder
                                </span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Link to="/cosomnia#preorder" className={PRIMARY_BTN}>
                                    Coming Soon
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link to="/cosomnia" className={GHOST_BTN}>
                                    Discover the story
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Next on the shelf — Super Bass Heroes */}
            <section id="super-bass-heroes" className="relative overflow-hidden border-b border-border/40">
                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:gap-16 md:py-28 lg:grid-cols-12 lg:[&>*:first-child]:order-2">
                    <div className="lg:col-span-6">
                        <Reveal>
                            <div className="relative mx-auto w-full max-w-xl">
                                <img
                                    src={SUPER_BASS_ART}
                                    alt="Super Bass Heroes — illustrated cover art by Torin Varlack"
                                    className="mx-auto h-auto w-full max-w-[420px] bg-transparent object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-6">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                Next on the shelf
                            </p>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                                {superBass.title}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <p className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-primary">
                                Coming 2027
                            </p>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
                                {superBass.description}
                            </p>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <p className="mt-4 text-sm tracking-wide text-muted-foreground">
                                By <span className="text-foreground">{superBass.author}</span> ·{' '}
                                {superBass.volume}
                            </p>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <div className="mt-10">
                                <Link to="/super-bass-heroes" className={GHOST_BTN}>
                                    View book details
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Editions index — editorial list, not product cards */}
            <section className="border-b border-border/40 bg-secondary/10">
                <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            Editions in preparation
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            The release ledger
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Every BassNotes title is being prepared across formats. Availability and pricing will be
                            announced as each release approaches preorder.
                        </p>
                    </Reveal>

                    <div className="mt-12 divide-y divide-border/50 border-y border-border/50">
                        {BOOKS_CATALOG.map((book, i) => (
                            <Reveal key={book.id} delay={i * 0.06}>
                                <Link
                                    to={book.detailsPath}
                                    className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-card/30 md:gap-8 md:py-8"
                                >
                                    <div className="col-span-2 md:col-span-1">
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="h-16 w-12 object-cover drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] md:h-20 md:w-14"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="col-span-7 md:col-span-7">
                                        <p className="font-display text-xl font-medium tracking-tight text-foreground transition-colors group-hover:text-primary md:text-2xl">
                                            {book.title}
                                        </p>
                                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            {book.series} · {book.volume}
                                        </p>
                                        <p className="mt-2 hidden max-w-md text-sm text-muted-foreground md:block">
                                            {book.shortDescription}
                                        </p>
                                    </div>
                                    <div className="col-span-3 text-right md:col-span-4">
                                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary md:text-xs">
                                            <Clock className="h-3 w-3" />
                                            {book.id === 'cosomnia' ? COSOMNIA_BOOK_RELEASE_LABEL : 'Coming 2027'}
                                        </span>
                                        <p className="mt-2 hidden text-xs text-muted-foreground md:block">
                                            Hardcover · eBook · Audiobook
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Checkout reserved for WooCommerce */}
            <section id="checkout" className="border-b border-border/40">
                <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            Checkout
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Reserved for launch
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Secure cart, payments, shipping, and order confirmations will be powered by{' '}
                            <strong className="font-semibold text-foreground">WooCommerce</strong> on this same{' '}
                            <span className="text-foreground">/store</span> path once fulfillment is configured.
                            Until then, every title points to its Coming Soon pathway.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <div className="mt-10 rounded-2xl border border-dashed border-border/80 bg-secondary/20 px-6 py-12">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/40">
                                <BookOpen className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                            </div>
                            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                                Cart · Shipping · Tax · Payment gateway
                            </p>
                            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                                Reserved for WooCommerce integration — inactive until preorder fulfillment is in place.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link to="/bookstore" className={PRIMARY_BTN}>
                                Browse the Bookstore
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/cosomnia#preorder" className={GHOST_BTN}>
                                Cosomnia Coming Soon
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/services" className={GHOST_BTN}>
                                Explore Services
                            </Link>
                            <Link to="/shop" className={GHOST_BTN}>
                                Classic shop view
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Services callout */}
            <section className="relative overflow-hidden border-b border-border/40 bg-secondary/20">
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:py-24 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Reveal>
                            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                <span className="h-px w-10 bg-primary/60" />
                                For schools, districts &amp; libraries
                            </p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                                Bring BassNotes into the classroom.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-5 max-w-xl text-muted-foreground">
                                Beyond the bookstore, BassNotes Publishing House &amp; Media offers teacher manuals,
                                school and district licensing, author readings, and customized professional learning
                                — all built around our original literature.
                            </p>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-4">
                        <Reveal delay={0.12}>
                            <div className="flex flex-wrap gap-4 lg:justify-end">
                                <Link to="/services" className={PRIMARY_BTN}>
                                    Explore Services
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link to="/contact" className={GHOST_BTN}>
                                    Request a Quote
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
