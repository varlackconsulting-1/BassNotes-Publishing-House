import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
    ArrowRight,
    BookOpen,
    GraduationCap,
    Layers,
    Music2,
    Sparkles,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import AboutHeroSlider from '@/components/site/AboutHeroSlider';
import Starfield from '@/components/site/Starfield';

const TORIN_PORTRAIT =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/0b6cfcbe79245d48d4ce48d3b151687b.png';

const STORE_URL = 'https://store.bassnotespublishing.com/';

const PRIMARY_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN =
    'inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';

const PILLARS = [
    {
        n: '01',
        icon: BookOpen,
        label: 'Publishing',
        body: 'Original books and story worlds for readers across age groups.',
    },
    {
        n: '02',
        icon: Music2,
        label: 'Music',
        body: 'Original scores, soundtracks, character themes, singles and other music created in connection with BassNotes story worlds.',
    },
    {
        n: '03',
        icon: Layers,
        label: 'Media & IP',
        body: 'Original characters and story worlds designed with the potential to extend into classrooms, digital media, animation, film, television, licensing and other formats.',
    },
];

const PRINCIPLES = [
    {
        n: '01',
        title: 'Original & Human-Created',
        body: 'Original stories. Original music. Original characters. BassNotes is a creator and owner of original intellectual property — written, drawn, and produced by people, never generated or borrowed.',
    },
    {
        n: '02',
        title: 'In-House Studio',
        body: 'Writing, illustration, music production, and creative direction all live under one roof — so every property keeps a single, consistent voice.',
    },
    {
        n: '03',
        title: 'Owned Outright',
        body: 'BassNotes retains long-term ownership of every intellectual property, preserving creative control and the future of each story world.',
    },
    {
        n: '04',
        title: 'Lean by Design',
        body: 'A lean production model supports quality control and stronger long-term margins — one story can generate multiple products and revenue streams.',
    },
];

const CLOSING_LINKS = [
    {
        to: '/cosomnia',
        label: 'Explore Cosomnia',
        body: 'Our debut story world — Dream On and the Cosomnia book are both coming soon in 2026.',
        icon: Sparkles,
    },
    {
        to: '/services',
        label: 'Explore Services',
        body: 'Books, teaching materials, licensing, speaking, and professional learning for schools and districts.',
        icon: GraduationCap,
    },
    {
        href: STORE_URL,
        label: 'Explore Store',
        body: 'The BassNotes bookstore — first editions, direct from the house.',
        icon: BookOpen,
    },
];

export default function AboutPage() {
    return (
        <main>
            <AboutHeroSlider />
            <Helmet>
                <title>About — BassNotes LLC · BassNotes Publishing House</title>
                <meta
                    name="description"
                    content="BassNotes LLC creates original intellectual property at the intersection of literature, music, and media — creating classics for this generation. Founded by Torin Varlack. Houston-based, creator-owned."
                />
            </Helmet>
            <Seo
                title="About — BassNotes LLC · BassNotes Publishing House"
                description="BassNotes LLC creates original intellectual property at the intersection of literature, music, and media. Founded by Torin Varlack. Houston-based, creator-owned."
                siteName="BassNotes LLC"
                image={TORIN_PORTRAIT}
            />

            {/* HERO */}
            <section className="relative flex min-h-[88dvh] items-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205_82%_95%),hsl(var(--background))_65%)]" />
                <Starfield density={70} />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto w-full max-w-5xl px-6 py-28 text-center md:py-36">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            About BassNotes
                            <span className="h-px w-10 bg-primary/60" />
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <h1 className="mt-8 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-[0.98] tracking-tight">
                            Stories with a{' '}
                            <span className="italic text-primary">sound</span> of their own.
                        </h1>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <p className="mt-7 font-display text-2xl font-light italic tracking-wide text-foreground/90 md:text-3xl">
                            Creating classics for this generation.
                        </p>
                    </Reveal>
                    <Reveal delay={0.24}>
                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            BassNotes creates original intellectual property at the intersection of literature,
                            music, and media — one roof for every form a story can take.
                        </p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Black-Owned IP · Houston-based · Creator-owned · Independent · For All Ages
                        </p>
                    </Reveal>
                    <Reveal delay={0.36}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={PRIMARY_BTN}>
                                Explore Store
                                <ArrowRight className="h-4 w-4" />
                            </a>
                            <Link to="/services" className={GHOST_BTN}>
                                Explore Services
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CORE BRAND LANGUAGE */}
            <section className="border-y border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-5xl px-6 py-20 text-center md:py-24">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            One vision
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div className="mt-8 grid gap-y-3 font-display text-2xl font-medium leading-snug tracking-tight md:text-4xl">
                            <p>Original literature.</p>
                            <p>Original music.</p>
                            <p>Original characters.</p>
                            <p className="italic text-primary">One vision.</p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* WHAT BASSNOTES DOES */}
            <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                <div className="grid gap-12 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            What BassNotes does
                        </p>
                        <h2 className="mt-6 font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                            One story,{' '}
                            <span className="italic text-primary">many forms.</span>
                        </h2>
                    </Reveal>
                    <div className="space-y-6 lg:col-span-7">
                        <Reveal delay={0.1}>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                Everything originates from the stories and intellectual property. BassNotes combines
                                three major areas — publishing, music, and media — without becoming three unrelated
                                businesses. Each property is designed to expand beyond the book.
                            </p>
                        </Reveal>
                    </div>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-3">
                    {PILLARS.map((item, i) => {
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
            </section>

            {/* MISSION */}
            <section className="relative border-y border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            Our mission
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <blockquote className="mt-8 font-display text-3xl font-medium leading-snug tracking-tight md:text-4xl lg:text-[2.75rem]">
                            To create timeless stories that advance literacy, celebrate African American voices, and
                            inspire generations through original literature, music, and media.
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            {/* VISION */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_72%)]" />
                <Starfield density={30} />
                <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            Our vision
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <blockquote className="mt-8 font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl lg:text-[2.25rem]">
                            To create the next generation of literary classics while building one of the world's
                            leading entertainment and education media companies — where original stories,
                            unforgettable characters, and culturally authentic voices shape imagination, education,
                            and culture for generations to come.
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            {/* PRINCIPLES */}
            <section className="mx-auto max-w-6xl px-6 py-24 md:py-28">
                <Reveal>
                    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        <span className="h-px w-10 bg-primary/60" />
                        How we work
                    </p>
                </Reveal>
                <Reveal delay={0.06}>
                    <h2 className="mt-5 font-display text-4xl font-medium tracking-tight md:text-5xl">
                        Original by default.
                    </h2>
                </Reveal>
                <div className="mt-14 grid gap-10 md:grid-cols-2">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.n} delay={i * 0.07}>
                            <div className="border-t border-border pt-6">
                                <p className="text-xs font-bold tracking-[0.3em] text-primary">{p.n}</p>
                                <h3 className="mt-3 font-display text-2xl font-semibold">{p.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* HUMAN MADE BADGE */}
            <section className="border-y border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
                    <Reveal>
                        <span className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
                            Human Made
                        </span>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90 md:text-xl">
                            All stories, songs &amp; characters original —{' '}
                            <span className="italic text-primary">no AI generation used.</span>
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                            Every BassNotes property is written, illustrated, composed, and produced by people —
                            owned outright, built to last.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* MEET THE CREATOR */}
            <section id="creator" className="relative overflow-hidden border-y border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Meet the creator
                        </p>
                    </Reveal>

                    <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
                        <div className="lg:col-span-5">
                            <Reveal y={24}>
                                <div className="relative mx-auto max-w-sm">
                                    <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.18),transparent_70%)] blur-2xl" />
                                    <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                                        <img
                                            src={TORIN_PORTRAIT}
                                            alt="Torin Varlack — author, educator, musician, and storyteller, founder of BassNotes LLC"
                                            className="h-auto w-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-7">
                            <Reveal>
                                <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                                    Torin Varlack
                                </h2>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                                    Author · Educator · Musician · Storyteller
                                </p>
                            </Reveal>
                            <Reveal delay={0.14}>
                                <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
                                    BassNotes is the creative home of Torin Varlack — a native Houstonian creating
                                    immersive story worlds. Original literature. Original music. Original characters.
                                    One vision.
                                </p>
                            </Reveal>
                            <Reveal delay={0.2}>
                                <p className="mt-4 leading-relaxed text-muted-foreground">
                                    As the founder of BassNotes, he leads an in-house creative studio — writing,
                                    illustrating, composing, and producing original story worlds that advance
                                    literacy and celebrate African American voices. BassNotes remains the central
                                    brand behind every property he builds.
                                </p>
                            </Reveal>
                        </div>
                    </div>

                    {/* CREATOR PILLARS */}
                    <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 md:grid-cols-3">
                        {/* THE AUTHOR */}
                        <Reveal>
                            <div className="h-full bg-card p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                        <BookOpen className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <h3 className="font-display text-xl font-semibold tracking-tight">
                                        The Author
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    As both an author and illustrator, Torin creates God-breathed stories across age
                                    groups and genres that examine and challenge the human condition. Through
                                    compelling characters, imaginative worlds, and original illustrations, each work
                                    invites readers into stories that linger long after the final page.
                                </p>
                            </div>
                        </Reveal>

                        {/* THE EDUCATOR */}
                        <Reveal delay={0.07}>
                            <div className="h-full bg-card p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                        <GraduationCap className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <h3 className="font-display text-xl font-semibold tracking-tight">
                                        The Educator
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    With expertise in English, Honors African American Studies, Sociology, and
                                    Psychology, Torin teaches grades 9–12 and has a proven record of improving
                                    standardized test scores, increasing reading comprehension, strengthening
                                    writing, and developing analytical thinkers. That same educational foundation
                                    shapes every BassNotes work — each intentionally built with educators and
                                    students in mind as both compelling literature and meaningful real-world
                                    experiences.
                                </p>
                            </div>
                        </Reveal>

                        {/* THE MUSICIAN */}
                        <Reveal delay={0.14}>
                            <div className="h-full bg-card p-8">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                        <Music2 className="h-4 w-4" strokeWidth={1.75} />
                                    </span>
                                    <h3 className="font-display text-xl font-semibold tracking-tight">
                                        The Musician
                                    </h3>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    A lifelong musician and passionate bassist, Torin's deep appreciation for the
                                    bass guitar shapes his musical identity. His musicianship extends to guitar,
                                    keys, composition, and music production. He personally writes, composes, arranges,
                                    and produces every original BassNotes soundtrack, ensuring each note serves the
                                    story with purpose, emotion, and intention.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Expanded house vision */}
            <section className="border-t border-border/50 bg-secondary/15">
                <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            BassNotes Publishing House
                        </p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
                            Mission, values & creative vision
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
                            <p>
                                BassNotes Publishing House exists to create classics for this generation — original
                                literature, original music, and original characters under one coherent vision. We
                                serve readers, parents, educators, librarians, and fans of illustrated stories who
                                want depth on the page and sound in the world.
                            </p>
                            <p>
                                Our values are simple and non-negotiable: human-made art, owned intellectual property,
                                literacy as culture, and immersive presentation — high-quality covers, transparent
                                character illustration, and story worlds designed to travel into classrooms, libraries,
                                and living rooms.
                            </p>
                            <p>
                                Creative vision means every title can grow: book, song, video, education kit, and
                                licensed media — without losing the voice that started it.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* CLOSING LINKS */}
            <section className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(186_56%_93%),hsl(var(--background))_70%)]" />
                <Starfield density={30} />
                <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
                    <Reveal>
                        <h2 className="font-display text-4xl font-medium leading-tight tracking-tight md:text-5xl">
                            Step into the{' '}
                            <span className="italic text-primary">BassNotes universe.</span>
                        </h2>
                    </Reveal>
                    <div className="mt-14 grid gap-6 md:grid-cols-3">
                        {CLOSING_LINKS.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <Reveal key={link.href || link.to} delay={i * 0.08}>
                                    {link.href ? (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border/70 bg-card p-8 text-center transition duration-300 hover:border-primary/50 hover:bg-secondary/40"
                                        >
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/60 text-primary transition group-hover:border-primary/50">
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </span>
                                            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                                                {link.label}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                                {link.body}
                                            </p>
                                            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                                Go
                                                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                            </span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.to}
                                            className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-border/70 bg-card p-8 text-center transition duration-300 hover:border-primary/50 hover:bg-secondary/40"
                                        >
                                            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/60 text-primary transition group-hover:border-primary/50">
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </span>
                                            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                                                {link.label}
                                            </h3>
                                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                                {link.body}
                                            </p>
                                            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                                                Go
                                                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                            </span>
                                        </Link>
                                    )}
                                </Reveal>
                            );
                        })}
                    </div>
                    <Reveal delay={0.2}>
                        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/cosomnia#preorder" className={PRIMARY_BTN}>
                                Cosomnia Coming Soon
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/partners" className={GHOST_BTN}>
                                Partner with BassNotes
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
