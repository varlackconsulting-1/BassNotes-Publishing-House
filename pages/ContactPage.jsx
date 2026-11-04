import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader2, Mail } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import Starfield from '@/components/site/Starfield';
import pocketbaseClient from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const STORE_URL = 'https://store.bassnotespublishing.com/';

const FIELD =
    'h-12 w-full rounded-full border border-border bg-secondary/40 px-5 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary focus:ring-2';
const AREA =
    'min-h-[140px] w-full rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary focus:ring-2';

export default function ContactPage() {
    const [contact, setContact] = useState({ name: '', email: '', subject: '', message: '' });
    const [contactStatus, setContactStatus] = useState('idle');
    const [news, setNews] = useState({ firstName: '', email: '' });
    const [newsStatus, setNewsStatus] = useState('idle');

    async function onContact(e) {
        e.preventDefault();
        if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
            toast.error('Please fill in your name, email, and message.');
            return;
        }
        setContactStatus('loading');
        try {
            await pocketbaseClient.collection('partner_inquiries').create({
                name: contact.name.trim(),
                email: contact.email.trim().toLowerCase(),
                organization: '',
                partner_type: 'General contact',
                message: [contact.subject.trim() && `Subject: ${contact.subject.trim()}`, contact.message.trim()]
                    .filter(Boolean)
                    .join('\n\n'),
                source: 'contact-page',
            });
            setContactStatus('done');
            setContact({ name: '', email: '', subject: '', message: '' });
            toast.success('Message sent. We will be in touch soon.');
        } catch (err) {
            setContactStatus('idle');
            toast.error(err?.message || 'Could not send. Please email hello@bassnotespublishing.com.');
        }
    }

    async function onNews(e) {
        e.preventDefault();
        if (!news.firstName.trim() || !news.email.trim()) {
            toast.error('Please enter your first name and email.');
            return;
        }
        setNewsStatus('loading');
        try {
            await pocketbaseClient.collection('newsletter_signups').create({
                first_name: news.firstName.trim(),
                email: news.email.trim().toLowerCase(),
                source: 'contact',
            });
            setNewsStatus('done');
            setNews({ firstName: '', email: '' });
            toast.success('You are on the BassNotes list.');
        } catch (err) {
            setNewsStatus('idle');
            toast.error(err?.message || 'That email may already be on the list.');
        }
    }

    return (
        <main>
            <Helmet>
                <title>Contact — BassNotes Publishing House</title>
                <meta
                    name="description"
                    content="Contact BassNotes Publishing House — readers, educators, librarians, and partners. Newsletter signup and direct email."
                />
            </Helmet>
            <Seo
                title="Contact — BassNotes Publishing House"
                description="Reach BassNotes Publishing House for reader questions, education inquiries, and press."
                siteName="BassNotes"
            />

            <section className="relative overflow-hidden border-b border-border/40 pt-40 md:pt-[12.5rem]">
                <Starfield density={28} />
                <div className="relative mx-auto max-w-4xl px-6 pb-14 pt-8 text-center">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Contact</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight md:text-5xl">
                            Write to the house
                        </h1>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
                            Readers, parents, educators, librarians, and fans — we read every note. Prefer email?{' '}
                            <a href="mailto:hello@bassnotespublishing.com" className="text-primary underline-offset-4 hover:underline">
                                hello@bassnotespublishing.com
                            </a>
                        </p>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <a
                                href={STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]"
                            >
                                Explore Store
                            </a>
                            <Link
                                to="/services"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-16 px-6 py-16 md:grid-cols-12 md:py-24">
                <div className="md:col-span-7">
                    <Reveal>
                        <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">Send a message</h2>
                    </Reveal>
                    <form onSubmit={onContact} className="mt-8 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="c-name" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    Name
                                </label>
                                <input
                                    id="c-name"
                                    className={FIELD}
                                    value={contact.name}
                                    onChange={(e) => setContact((s) => ({ ...s, name: e.target.value }))}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="c-email" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    Email
                                </label>
                                <input
                                    id="c-email"
                                    type="email"
                                    className={FIELD}
                                    value={contact.email}
                                    onChange={(e) => setContact((s) => ({ ...s, email: e.target.value }))}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="c-subject" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Subject
                            </label>
                            <input
                                id="c-subject"
                                className={FIELD}
                                value={contact.subject}
                                onChange={(e) => setContact((s) => ({ ...s, subject: e.target.value }))}
                                placeholder="Optional"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="c-message" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Message
                            </label>
                            <textarea
                                id="c-message"
                                className={AREA}
                                value={contact.message}
                                onChange={(e) => setContact((s) => ({ ...s, message: e.target.value }))}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={contactStatus === 'loading' || contactStatus === 'done'}
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition hover:brightness-110 disabled:opacity-60"
                        >
                            {contactStatus === 'loading' ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                                </>
                            ) : contactStatus === 'done' ? (
                                'Sent'
                            ) : (
                                <>
                                    <Mail className="h-4 w-4" /> Send message
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="md:col-span-5">
                    <Reveal delay={0.08}>
                        <div className="rounded-2xl border border-border/60 bg-card/50 p-8">
                            <h2 className="font-display text-2xl font-medium tracking-tight">Newsletter</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                Optional signup for release dates, music drops, educator resources, and store news.
                            </p>
                            <form onSubmit={onNews} className="mt-6 space-y-3">
                                <input
                                    className={FIELD}
                                    placeholder="First name"
                                    value={news.firstName}
                                    onChange={(e) => setNews((s) => ({ ...s, firstName: e.target.value }))}
                                    required
                                    autoComplete="given-name"
                                />
                                <input
                                    type="email"
                                    className={FIELD}
                                    placeholder="Email"
                                    value={news.email}
                                    onChange={(e) => setNews((s) => ({ ...s, email: e.target.value }))}
                                    required
                                    autoComplete="email"
                                />
                                <button
                                    type="submit"
                                    disabled={newsStatus === 'loading' || newsStatus === 'done'}
                                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-semibold uppercase tracking-[0.15em] transition hover:border-primary/60 hover:text-primary disabled:opacity-60"
                                >
                                    {newsStatus === 'loading' ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : newsStatus === 'done' ? (
                                        'Subscribed'
                                    ) : (
                                        'Join the list'
                                    )}
                                </button>
                            </form>
                        </div>
                    </Reveal>
                    <Reveal delay={0.12}>
                        <p className="mt-8 text-sm text-muted-foreground">
                            Trade, library, school, and licensing inquiries can also use our{' '}
                            <Link to="/partners" className="text-foreground underline decoration-primary/50 underline-offset-4">
                                Partners
                            </Link>{' '}
                            pathway, or explore our{' '}
                            <Link to="/services" className="text-foreground underline decoration-primary/50 underline-offset-4">
                                Services
                            </Link>{' '}
                            for schools and districts.
                        </p>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
