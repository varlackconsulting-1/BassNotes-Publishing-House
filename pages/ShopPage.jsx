import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Reveal from '@/components/Reveal';
import PageHero from '@/components/site/PageHero';
import CosomniaCover from '@/components/site/CosomniaCover';
import AssetPlaceholder from '@/components/site/AssetPlaceholder';
import { COSOMNIA_BOOK_RELEASE_LABEL } from '@/data/catalog';

const COMING_SOON = [
    { variant: 'artwork', title: 'Cosomnia — Soundscape edition', meta: 'Coming soon' },
    { variant: 'cover', title: 'BassNotes editions', meta: 'Coming soon' },
    { variant: 'artwork', title: 'Prints & paper goods', meta: 'Coming soon' },
];

export default function ShopPage() {
    return (
        <main>
            <Helmet>
                <title>Shop — BassNotes LLC</title>
                <meta
                    name="description"
                    content="Cosomnia is coming soon in 2026. Shop original editions, music, and print goods from BassNotes LLC — independent publishing and creative media."
                />
            </Helmet>

            <PageHero kicker="The shop" title="Shop BassNotes.">
                Original editions, music, and print goods — direct from the house. The shelves open with Cosomnia.
            </PageHero>

            <section id="cosomnia" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                <div className="grid gap-12 rounded-lg border border-border/60 bg-card/50 p-8 md:p-12 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <Reveal>
                            <CosomniaCover className="mx-auto w-56 sm:w-64" />
                        </Reveal>
                    </div>
                    <div className="lg:col-span-8">
                        <Reveal>
                            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                                {COSOMNIA_BOOK_RELEASE_LABEL}
                            </span>
                        </Reveal>
                        <Reveal delay={0.05}>
                            <h2 className="mt-6 font-display text-4xl font-medium tracking-tight md:text-5xl">
                                Cosomnia
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
                                The debut original property from BassNotes LLC — a story for the hours when the world
                                sleeps and imagination refuses to. Hardcover, eBook, and audiobook editions arrive
                                together.
                            </p>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div className="mt-8 flex flex-wrap gap-3">
                                {['Hardcover', 'eBook', 'Audiobook'].map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8 flex items-baseline gap-4">
                                <span className="font-display text-4xl">$—</span>
                                <span className="text-sm text-muted-foreground">Pricing announced at preorder</span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <button
                                type="button"
                                disabled
                                className="mt-8 inline-flex cursor-not-allowed items-center rounded-full bg-primary/50 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground/70"
                            >
                                {COSOMNIA_BOOK_RELEASE_LABEL}
                            </button>
                            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                                Want word the moment preorders open? Write to{' '}
                                <a
                                    href="mailto:hello@bassnotesllc.com"
                                    className="text-foreground underline decoration-primary/60 underline-offset-4 transition hover:text-primary"
                                >
                                    hello@bassnotesllc.com
                                </a>{' '}
                                and we will put you first on the list.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-t border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Also coming to the shop
                        </h2>
                    </Reveal>
                    <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {COMING_SOON.map((item, i) => (
                            <Reveal key={item.title} delay={i * 0.08}>
                                <AssetPlaceholder variant={item.variant} title={item.title} meta={item.meta} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t border-border/60">
                <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-20">
                    <Reveal>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Looking for the full bookstore experience? Visit the{' '}
                            <a href="https://store.bassnotespublishing.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">
                                BassNotes store
                            </a>{' '}
                            — product cards, book details, and a WooCommerce-ready checkout shell live there.
                        </p>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
