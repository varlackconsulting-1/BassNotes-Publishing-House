import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import CosomniaCover, { COVER_3D_URL } from '@/components/site/CosomniaCover';

const STORE_URL = 'https://store.bassnotespublishing.com/';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';

export default function ServicesPage() {
    return (
        <main>
            <Helmet>
                <title>Services — BassNotes Publishing House & Media</title>
                <meta
                    name="description"
                    content="BassNotes Publishing House & Media services: publications and educational resources, teacher manuals, school and district licensing, readings and speaking, Cosomnia professional learning, teacher professional development, and customized institutional packages."
                />
            </Helmet>
            <Seo
                title="Services — BassNotes Publishing House & Media"
                description="Books, educational resources, teacher manuals, licensing, readings, speaking, and professional learning from BassNotes Publishing House & Media."
                siteName="BassNotes"
                image={COVER_3D_URL}
            />

            {/* HERO */}
            <section className="relative flex min-h-[88dvh] items-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205_82%_95%),hsl(var(--background))_65%)]" />
                <Starfield density={70} />
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto w-full max-w-5xl px-6 py-28 text-center md:py-36">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            BassNotes Publishing House &amp; Media
                            <span className="h-px w-10 bg-primary/60" />
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="mt-8 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
                            Books, resources &amp;{' '}
                            <span className="italic text-primary">professional learning.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            A full offering for schools, districts, libraries, and community programs — original
                            literature, classroom-ready teaching materials, licensing, author appearances, and
                            customized professional development.
                        </p>
                    </Reveal>
                    <Reveal delay={0.26}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={PRIMARY_BTN}>
                                Explore Store
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link to="/contact" className={GHOST_BTN}>
                                Request a Quote
                            </Link>
                        </div>
                    </Reveal>
                    <Reveal delay={0.32}>
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Houston, Texas · Creating the Classics of Tomorrow
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* COSOMNIA TEACHING MATERIALS CALLOUT */}
            <section className="relative overflow-hidden border-y border-border/60 bg-secondary/20">
                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:gap-16 md:py-28 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <div className="relative mx-auto w-full max-w-sm">
                                <div className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,hsl(210_80%_50%/0.2),transparent_70%)] blur-2xl" />
                                <CosomniaCover
                                    variant="3d"
                                    className="relative mx-auto w-full max-w-[300px] bg-transparent sm:max-w-[340px]"
                                />
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                Built around Cosomnia
                            </p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                                Cosomnia teaching materials
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                                The complete packet turns Cosomnia into a classroom-ready program — with pacing,
                                assessments, cross-disciplinary connections, and printable aids. Student books are
                                licensed separately from teacher resources and professional learning.
                            </p>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                Formal standards alignment or curriculum-adoption claims are made only after the
                                materials are mapped, reviewed, and piloted.
                            </p>
                        </Reveal>
                        <Reveal delay={0.22}>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/cosomnia" className={PRIMARY_BTN}>
                                    Discover Cosomnia
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>
                                    Explore Store
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <Starfield density={30} />
                <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                            Ready to build a{' '}
                            <span className="italic text-primary">custom package?</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                            Combine books, teacher resources, readings, and professional learning in one institutional
                            quote. Tell us about your school, district, or program.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/contact" className={PRIMARY_BTN}>
                                Request a Quote
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>
                                Explore Store
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
