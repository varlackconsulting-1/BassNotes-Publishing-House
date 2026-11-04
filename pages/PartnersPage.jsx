import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    ArrowRight,
    BookOpen,
    Building2,
    Clapperboard,
    Film,
    GraduationCap,
    Handshake,
    Library,
    Loader2,
    Mic2,
    Newspaper,
    PackageCheck,
    Palette,
    School,
    Sparkles,
    Store,
    Users,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import Starfield from '@/components/site/Starfield';
import pocketbaseClient from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

// Scalable pathway registry — add a category here and it renders everywhere.
const PATHWAYS = [
    {
        group: 'Retail & Distribution',
        items: [
            { icon: Store, title: 'Retailers', body: 'Carry the BassNotes catalog across retail channels and storefronts.' },
            { icon: BookOpen, title: 'Bookstores', body: 'Stock Cosomnia and future titles, host signings and shelf features.' },
            { icon: PackageCheck, title: 'Distribution', body: 'Wholesale, distribution, and fulfillment partnerships to reach more readers.' },
        ],
    },
    {
        group: 'Education & Community',
        items: [
            { icon: Library, title: 'Libraries', body: 'Add BassNotes titles to your collection and host community reading programs.' },
            { icon: School, title: 'Schools', body: 'Bring literacy programs, reading guides, and classroom editions to students.' },
            { icon: GraduationCap, title: 'Educators', body: 'Curriculum tie-ins, author-led workshops, and educator resource packs.' },
            { icon: Users, title: 'Events', body: 'Festivals, conferences, and community gatherings featuring BassNotes properties.' },
            { icon: Mic2, title: 'Author Appearances', body: 'Bookings for talks, readings, panels, and school visits with Torin Varlack.' },
        ],
    },
    {
        group: 'Music & Creative',
        items: [
            { icon: Handshake, title: 'Music Collaborations', body: 'Co-produce scores, songs, and soundscapes for BassNotes story worlds.' },
            { icon: Palette, title: 'Creative Collaborations', body: 'Artists, designers, and creators expanding our visual and narrative worlds.' },
        ],
    },
    {
        group: 'Media, Licensing & IP',
        items: [
            { icon: Newspaper, title: 'Media', body: 'Press, features, interviews, and editorial coverage of BassNotes releases.' },
            { icon: Building2, title: 'Licensing', body: 'Adaptation, merchandise, and brand licensing for BassNotes properties.' },
            { icon: Film, title: 'Film / Television / Media Inquiries', body: 'Option and adaptation rights for Cosomnia, Super Bass Heroes, and future worlds.' },
        ],
    },
];

const PATHWAY_OPTIONS = PATHWAYS.flatMap((g) => g.items.map((i) => i.title));

const INPUT_BASE =
    'w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary transition focus:ring-2 focus:border-primary/60';

export default function PartnersPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        organization: '',
        partner_type: '',
        message: '',
    });
    const [status, setStatus] = useState('idle');

    function update(field) {
        return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
    }

    async function onSubmit(e) {
        e.preventDefault();
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error('Please add your name, email, and a short message.');
            return;
        }
        setStatus('loading');
        try {
            await pocketbaseClient.collection('partner_inquiries').create({
                name: form.name.trim(),
                email: form.email.trim().toLowerCase(),
                organization: form.organization.trim(),
                partner_type: form.partner_type,
                message: form.message.trim(),
                source: 'partners-page',
            });
            setStatus('done');
            setForm({ name: '', email: '', organization: '', partner_type: '', message: '' });
            toast.success('Your inquiry is in. BassNotes will be in touch.');
        } catch (err) {
            setStatus('idle');
            const msg = err?.data?.data?.email?.message || err?.message || 'Something went wrong. Please try again.';
            toast.error(typeof msg === 'string' ? msg : 'Could not submit. Please try again.');
        }
    }

    return (
        <main>
            <Helmet>
                <title>Work With BassNotes — Partners | BassNotes LLC</title>
                <meta
                    name="description"
                    content="Partner with BassNotes LLC — retailers, bookstores, libraries, schools, educators, media, music collaborations, licensing, distribution, events, author appearances, creative collaborations, and film/television/media inquiries."
                />
            </Helmet>

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border/60 pb-16 pt-48 md:pb-20 md:pt-[14.5rem]">
                <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.15),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-5xl px-6">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Partners
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[1.02] tracking-tight">
                            Work with <span className="italic text-primary">BassNotes.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            BassNotes is building more than books — original worlds where stories, music, and media
                            come together. We grow through collaboration with the retailers, educators, artists, and
                            organizations who carry those worlds into communities.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* INQUIRY PATHWAYS */}
            <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                <Reveal>
                    <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                        Inquiry pathways
                    </h2>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                        Tell us where you fit. Every pathway below routes to the right team — and every serious
                        inquiry gets a reply.
                    </p>
                </Reveal>

                <div className="mt-14 space-y-16">
                    {PATHWAYS.map((group, gi) => (
                        <Reveal key={group.group} delay={gi * 0.04}>
                            <div>
                                <div className="flex items-center gap-4">
                                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                                        {group.group}
                                    </h3>
                                    <span className="h-px flex-1 bg-border/60" />
                                </div>
                                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.items.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <Reveal key={item.title} delay={i * 0.05}>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setForm((prev) => ({ ...prev, partner_type: item.title }));
                                                        document
                                                            .getElementById('inquiry-form')
                                                            ?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="group flex h-full w-full flex-col items-start gap-4 rounded-2xl border border-border/70 bg-card/60 p-6 text-left transition duration-300 hover:border-primary/50 hover:bg-card"
                                                >
                                                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-primary transition group-hover:bg-primary/10">
                                                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                                                    </span>
                                                    <div>
                                                        <h4 className="font-display text-lg font-semibold tracking-tight">
                                                            {item.title}
                                                        </h4>
                                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                            {item.body}
                                                        </p>
                                                    </div>
                                                    <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary opacity-0 transition group-hover:opacity-100">
                                                        Select & inquire
                                                        <ArrowRight className="h-3.5 w-3.5" />
                                                    </span>
                                                </button>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* INQUIRY FORM */}
            <section id="inquiry-form" className="relative overflow-hidden border-t border-border/60">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(205_82%_95%),hsl(var(--background))_70%)]" />
                <Starfield density={32} />
                <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
                    <Reveal>
                        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Inquiry form
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            Partner with <span className="italic text-primary">BassNotes.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                            Share a few details about you, your organization, and what you are dreaming up. We read
                            every inquiry and respond to serious opportunities.
                        </p>
                    </Reveal>

                    <Reveal delay={0.18}>
                        <form onSubmit={onSubmit} className="mt-10 grid gap-5">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="p-name" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Name
                                    </label>
                                    <input
                                        id="p-name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={update('name')}
                                        className={INPUT_BASE}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="p-email" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Email
                                    </label>
                                    <input
                                        id="p-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="you@organization.com"
                                        value={form.email}
                                        onChange={update('email')}
                                        className={INPUT_BASE}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="p-org" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Organization <span className="text-muted-foreground/60">(optional)</span>
                                    </label>
                                    <input
                                        id="p-org"
                                        name="organization"
                                        type="text"
                                        autoComplete="organization"
                                        placeholder="Company, school, or outlet"
                                        value={form.organization}
                                        onChange={update('organization')}
                                        className={INPUT_BASE}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="p-type" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                        Inquiry type
                                    </label>
                                    <select
                                        id="p-type"
                                        name="partner_type"
                                        value={form.partner_type}
                                        onChange={update('partner_type')}
                                        className={`${INPUT_BASE} appearance-none`}
                                    >
                                        <option value="">Select a pathway…</option>
                                        {PATHWAY_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="p-message" className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                    Message
                                </label>
                                <textarea
                                    id="p-message"
                                    name="message"
                                    rows={5}
                                    placeholder="Tell us about your organization and what you would like to build with BassNotes."
                                    value={form.message}
                                    onChange={update('message')}
                                    className={`${INPUT_BASE} resize-y`}
                                    required
                                />
                            </div>

                            <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
                                    Your details are sent securely to the BassNotes partnerships team. We never share
                                    inquiry data.
                                </p>
                                <button
                                    type="submit"
                                    disabled={status === 'loading' || status === 'done'}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Sending…
                                        </>
                                    ) : status === 'done' ? (
                                        <>
                                            <Sparkles className="h-4 w-4" />
                                            Inquiry sent
                                        </>
                                    ) : (
                                        <>
                                            Partner with BassNotes
                                            <ArrowRight className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </Reveal>
                </div>
            </section>

            {/* CLOSING */}
            <section className="border-t border-border/60 bg-secondary/20">
                <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
                            Good stories travel{' '}
                            <span className="italic text-primary">further together.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground">
                            Cosomnia is the flagship experience. Super Bass Heroes is the next world coming soon. The
                            partnerships we build today carry those worlds further tomorrow.
                        </p>
                    </Reveal>
                    <Reveal delay={0.18}>
                        <a
                            href="#inquiry-form"
                            className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition hover:border-primary/60 hover:text-primary active:scale-[0.98]"
                        >
                            <Clapperboard className="h-4 w-4" />
                            Start an inquiry
                        </a>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
