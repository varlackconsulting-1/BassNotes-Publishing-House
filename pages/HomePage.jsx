import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, BookOpen, GraduationCap, Layers, Loader2, Music2, School, Send, Sparkles, Users, Library, Facebook, Instagram, Youtube } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import AboutHeroSlider from '@/components/site/AboutHeroSlider';
import pocketbaseClient from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { COSOMNIA_COVER, SUPER_BASS_ART, SUPER_BASS_COVER } from '@/data/catalog';
const TORIN_PORTRAIT = 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/0b6cfcbe79245d48d4ce48d3b151687b.png';
const STORE_URL = 'https://store.bassnotespublishing.com/';
const NAVY_BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const ORANGE_BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-secondary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const OUTLINE_BTN = 'inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-primary transition duration-200 hover:border-primary hover:bg-primary/5 active:scale-[0.98]';
const PILLARS = [{
  icon: BookOpen,
  label: 'Publishing',
  body: 'Original Stories. Real Creativity. Human written stories and original illustrations that inspire imagination, confidence, and a love of reading for all ages.'
}, {
  icon: Music2,
  label: 'Music',
  body: 'Every story has its own sound. Original music, soundtracks, and audio experiences that bring characters and adventures to life.'
}, {
  icon: Layers,
  label: 'Media & IP',
  body: 'Worlds built to grow beyond the page. Characters and stories developed for books, education, digital media, animation, and entertainment.'
}, {
  icon: GraduationCap,
  label: 'Education',
  body: 'Learning through storytelling. Tools and experiences designed to promote literacy, creativity, and lifelong learning for young minds.'
}];
const CATEGORIES = [{
  id: 'new',
  label: 'New Releases'
}, {
  id: 'coming',
  label: 'Coming Soon'
}, {
  id: 'ya',
  label: 'Young Adult'
}, {
  id: 'children',
  label: 'Children'
}];
const FEATURED = [{
  id: 'cosomnia',
  title: 'Cosomnia',
  categories: ['new', 'coming', 'ya'],
  description: 'A mysterious tech-driven adventure that challenges perception, exposes buried truths, and tests the courage to see reality.',
  cover: COSOMNIA_COVER,
  age: 'Young Adult · Coming Soon · 2026',
  href: '/cosomnia'
}, {
  id: 'super-bass-heroes',
  title: 'Super Bass Heroes',
  categories: ['new', 'coming', 'children'],
  description: 'A fun, music-filled journey that teaches teamwork, confidence, and the importance of using your talents to help others.',
  cover: SUPER_BASS_COVER,
  age: 'Ages 8–11 · Grades 3–5 · Coming 2027',
  href: '/books'
}];
const PARTNERS = [{
  icon: School,
  title: 'Schools',
  body: 'Literacy programs and reading initiatives for classrooms.'
}, {
  icon: GraduationCap,
  title: 'Educators',
  body: 'Teaching resources and curriculum-aligned materials.'
}, {
  icon: Library,
  title: 'Literacy Programs',
  body: 'Community reading drives and book access for all.'
}, {
  icon: Users,
  title: 'Community Organizations',
  body: 'Partnerships that put stories into young hands.'
}];
const SOCIALS = [{
  icon: Facebook,
  label: 'Facebook',
  href: '#'
}, {
  icon: Instagram,
  label: 'Instagram',
  href: '#'
}, {
  icon: Youtube,
  label: 'YouTube',
  href: '#'
}];
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  function update(field) {
    return e => setForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please add your name, email, and a message.');
      return;
    }
    setStatus('loading');
    try {
      await pocketbaseClient.collection('partner_inquiries').create({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        organization: '',
        partner_type: 'General contact',
        message: [form.subject.trim() && `Subject: ${form.subject.trim()}`, form.message.trim()].filter(Boolean).join('\n\n'),
        source: 'homepage-contact'
      });
      setStatus('done');
      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      toast.success('Thank you — your message has been sent.');
    } catch (err) {
      setStatus('idle');
      toast.error(err?.message || 'Could not send. Please try again.');
    }
  }
  const FIELD = 'h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary transition focus:ring-2 focus:border-primary/50';
  const AREA = 'min-h-[130px] w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-primary transition focus:ring-2 focus:border-primary/50 resize-y';
  return <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                    <label htmlFor="h-name" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span style={{
            fontSize: "16px",
            lineHeight: "normal"
          }}>Name</span></label>
                    <input id="h-name" className={FIELD} value={form.name} onChange={update('name')} required autoComplete="name" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="h-email" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span style={{
            fontSize: "16px",
            lineHeight: "normal"
          }}>Email</span></label>
                    <input id="h-email" type="email" className={FIELD} value={form.email} onChange={update('email')} required autoComplete="email" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="h-subject" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span style={{
          fontSize: "16px",
          lineHeight: "normal"
        }}>Subject</span></label>
                <input id="h-subject" className={FIELD} value={form.subject} onChange={update('subject')} placeholder="Publishing or media inquiry" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="h-message" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><span style={{
          fontSize: "16px",
          lineHeight: "normal"
        }}>Message</span></label>
                <textarea id="h-message" className={AREA} value={form.message} onChange={update('message')} required />
            </div>
            <button type="submit" disabled={status === 'loading' || status === 'done'} className={`${NAVY_BTN} mt-1 justify-center`}>
                {status === 'loading' ? <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </> : status === 'done' ? <>
                        <Sparkles className="h-4 w-4" /> Message sent
                    </> : <>
                        <Send className="h-4 w-4" /> Send message
                    </>}
            </button>
        </form>;
}
export default function HomePage() {
  const [active, setActive] = useState('new');
  const visible = FEATURED.filter(b => b.categories.includes(active));
  return <main>
            <AboutHeroSlider />
            <Helmet>
                <title>Bass Notes Publishing — Creating Classics for This Generation</title>
                <meta name="description" content="Bass Notes Publishing creates inspiring books, music-driven stories, and educational content that build character, imagination, and literacy. Discover Super Bass Heroes and more." />
            </Helmet>
            <Seo title="Bass Notes Publishing — Creating Classics for This Generation" description="Books, music, and educational adventures that build character, creativity, and confidence." siteName="Bass Notes Publishing" image={SUPER_BASS_ART} />

            {/* SECTION 1 — HERO */}
            <section className="relative overflow-hidden bg-background pt-10 md:pt-14">
                <div className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,hsl(186_56%_58%/0.18),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,hsl(30_89%_55%/0.14),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-28">
                    <div className="lg:col-span-6">
                        <Reveal delay={0.08}>
                            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-primary">
                                Stories That Inspire the Next Generation
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                                Books, music, and educational adventures that build character, creativity, and confidence.
                            </p>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className="mt-9 flex flex-wrap items-center gap-4">
                                <Link to="/bookstore" className={ORANGE_BTN}>
                                    Shop Books
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link to="/about#author" className={OUTLINE_BTN}>
                                    Meet the Author
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-6">
                        <Reveal delay={0.2} y={28}>
                            <div className="float-slow relative mx-auto w-full max-w-xl">
                                <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,hsl(186_56%_58%/0.22),transparent_70%)] blur-2xl" />
                                <img src={SUPER_BASS_ART} alt="Super Bass Heroes book collection by Bass Notes Publishing" className="relative mx-auto h-auto w-full max-w-md object-contain drop-shadow-[0_40px_60px_rgba(10,61,98,0.25)]" loading="eager" decoding="async" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SECTION 2 — WELCOME */}
            <section className="relative bg-[#f4f6f8] bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "url('https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/websitebackgroundwsbh-VvR8B.png')"
    }}>
                <div className="absolute inset-0 bg-white/82" aria-hidden="true" />
                <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-20">
                    <Reveal>
                        <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-[#1a1a1a] md:text-[2rem]">
                            Welcome to Bass Notes Publishing
                        </h2>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <p className="mt-2 text-center text-sm text-[#2f6fed]"><span style={{
              fontSize: "16px",
              lineHeight: "normal"
            }}>Where we create classics for this generation.</span></p>
                    </Reveal>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return <Reveal key={p.label} delay={i * 0.06}>
                                    <div className="flex h-full gap-4 rounded-sm border border-[#e6e8eb] bg-white p-6">
                                        <Icon className="mt-0.5 h-8 w-8 shrink-0 text-primary" strokeWidth={1.5} />
                                        <div>
                                            <h3 className="text-[21px] font-semibold text-primary">{p.label}</h3>
                                            <p className="mt-2 text-base leading-relaxed text-[#5c6570]">{p.body}</p>
                                        </div>
                                    </div>
                                </Reveal>;
          })}
                    </div>
                </div>
            </section>

            {/* SECTION 3 — DISCOVER */}
            <section className="bg-[#3c3c3c]">
                <div className="mx-auto max-w-6xl px-6 py-14 md:py-16">
                    <Reveal>
                        <h2 className="text-center font-display text-3xl font-semibold text-[#e39b3a] md:text-4xl">
                            Discover Your Next Book
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                            {CATEGORIES.map(cat => <button key={cat.id} type="button" onClick={() => setActive(cat.id)} className={`min-h-11 text-[16px] font-bold uppercase tracking-[0.12em] transition ${active === cat.id ? 'text-[#e23b4a]' : 'text-white hover:text-[#e39b3a]'}`}>
                                    {cat.label}
                                </button>)}
                        </div>
                    </Reveal>
                    <div className="mt-8 grid items-stretch gap-0 bg-[#ececec] md:grid-cols-[minmax(0,280px)_1fr]">
                        <div className="flex min-h-[280px] items-stretch justify-center overflow-hidden bg-[#d8c7a4]">
                            <img src="https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/website-asset-A07sh.png" alt="Super Bass Heroes books from Bass Notes Publishing" className="h-full w-full object-cover" loading="lazy" decoding="async" />
                        </div>
                        <div className="divide-y divide-[#d9d9d9]">
                            {visible.length === 0 ? <p className="p-8 text-sm text-[#5c6570]">No titles in this category yet.</p> : visible.map(book => <article key={book.id} className="flex gap-4 p-5 sm:gap-6 sm:p-6">
                                        <img src={book.cover} alt={`${book.title} cover`} className="h-32 w-24 shrink-0 object-contain sm:h-40 sm:w-28" loading="lazy" decoding="async" />
                                        <div className="min-w-0">
                                            <h3 className="text-[16px] font-semibold text-[#1a1a1a]">{book.title}</h3>
                                            <p className="mt-1 text-[14px] leading-relaxed text-[#5c6570]">{book.description}</p>
                                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#8a4b12]">
                                                {book.age}
                                            </p>
                                            <Link to="/bookstore" className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#c23b4a] underline-offset-4 hover:underline"><span style={{
                    fontSize: "16px",
                    lineHeight: "normal",
                    color: "rgb(217, 119, 6)"
                  }}>Shop at the bookstore</span><ArrowRight className="h-3.5 w-3.5" /></Link>
                                        </div>
                                    </article>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4 — MEET THE AUTHOR */}
            <section id="author" className="bg-muted">
                <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Reveal y={24}>
                            <div className="relative mx-auto max-w-sm">
                                <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,hsl(30_89%_55%/0.16),transparent_70%)] blur-2xl" />
                                <div className="relative overflow-hidden rounded-2xl border border-border shadow-[0_30px_60px_-20px_rgba(10,61,98,0.35)]">
                                    <img src={TORIN_PORTRAIT} alt="Torin Varlack — author, educator, musician, and storyteller, founder of BassNotes LLC" className="h-auto w-full object-cover" loading="lazy" />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary"><span style={{
                fontSize: "16px",
                lineHeight: "normal"
              }}>Meet the Author</span></p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                                Torin Varlack
                            </h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                                Author · Educator · Musician · Storyteller
                            </p>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                                BassNotes is the creative home of Torin Varlack, a native Houstonian creating
                                immersive story worlds through original literature, original music, and original
                                characters. One vision.
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <p className="mt-4 leading-relaxed text-muted-foreground"><span style={{
                fontSize: "18px",
                lineHeight: "normal"
              }}>As the founder of BassNotes, he leads an in-house creative studio where he writes, illustrates, composes, and produces original story worlds that advance literacy and celebrate African American voices. BassNotes remains the central creative brand behind every property he builds.</span></p>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className="mt-8">
                                <Link to="/author" className={NAVY_BTN}>
                                    Learn More
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SECTION 5 — SUPER BASS HEROES SERIES */}
            <section className="bg-background">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="text-center">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary"><span style={{
                fontSize: "16px",
                lineHeight: "normal"
              }}>nEW rELEASES</span></p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                                Super Bass Heroes
                            </h2>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mx-auto mt-5 max-w-xl text-muted-foreground"></p>
                        </Reveal>
                    </div>

                    <Reveal delay={0.16}>
                        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin]">
                            <article className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-muted/60 sm:w-[420px]">
                                <div className="flex items-center justify-center bg-background p-8">
                                    <img src={SUPER_BASS_COVER} alt="Super Bass Heroes — book cover" className="h-auto w-64 object-contain drop-shadow-[0_22px_36px_rgba(10,61,98,0.28)]" loading="lazy" decoding="async" />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">children's book series</span>
                                    <h3 className="mt-2 font-display text-2xl font-semibold text-primary">Super Bass Heroes</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><span style={{
                    fontSize: "18px",
                    lineHeight: "normal"
                  }}><span style={{
                      lineHeight: "normal"
                    }}>Discover Super Bass Heroes, a children's musical adventure exploring why the world needs bass. An imaginative read for ages 8–11 and grades 3–5.</span></span></p>
                                    <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-secondary-foreground transition hover:brightness-110 active:scale-[0.98]">
                                        Purchase
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </article>

                            <article className="flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-muted/60 sm:w-[420px]">
                                <div className="flex items-center justify-center bg-background p-8">
                                    <img src="https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/cosomnia_front-book-cover-ODs16.png" alt="Cosomnia — book cover" className="h-auto w-48 object-contain drop-shadow-[0_22px_36px_rgba(10,61,98,0.28)]" loading="lazy" decoding="async" />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">Young Adult · Dystopian Fiction</span>
                                    <h3 className="mt-2 font-display text-2xl font-semibold text-primary">COSOMNIA</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><span style={{
                    fontSize: "18px",
                    lineHeight: "normal"
                  }}>A gripping dystopian thriller where a live streamer uncovers a disturbing truth: the reality he sees isn't the same as everyone else's, forcing him into a battle against those controlling perception and free will.</span></p>
                                    <Link to="/cosomnia" className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-secondary-foreground transition hover:brightness-110 active:scale-[0.98]">
                                        Learn More
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                            </article>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 6 — PARTNERS & COMMUNITY */}
            <section className="bg-muted">
                <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Partners & Community</p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                                Building the Future Through Literacy
                            </h2>
                        </Reveal>
                    </div>
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {PARTNERS.map((p, i) => {
            const Icon = p.icon;
            return <Reveal key={p.title} delay={i * 0.07}>
                                    <div className="h-full rounded-2xl border border-border bg-background p-7 text-center transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-20px_rgba(10,61,98,0.25)]">
                                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Icon className="h-6 w-6" strokeWidth={1.75} />
                                        </span>
                                        <h3 className="mt-5 font-display text-[21px] font-semibold text-primary">{p.title}</h3>
                                        <p className="mt-2 text-base leading-relaxed text-muted-foreground">{p.body}</p>
                                    </div>
                                </Reveal>;
          })}
                    </div>
                    <Reveal delay={0.2}>
                        <div className="mt-12 text-center">
                            <Link to="/partners" className={OUTLINE_BTN}>
                                Partner With Us
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* SECTION 7 — CONTACT */}
            <section id="contact" className="bg-background">
                <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Contact</p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                                Let&apos;s Create Together
                            </h2>
                        </Reveal>
                        <Reveal delay={0.12}>
                            <p className="mt-6 text-[18px] leading-relaxed text-muted-foreground">
                                Publishing inquiries, media requests, and partnership questions — we&apos;d love to hear
                                from you. Prefer email?{' '}
                                <a href="mailto:hello@bassnotespublishing.com" className="text-primary underline-offset-4 hover:underline">
                                    hello@bassnotespublishing.com
                                </a>
                            </p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <div className="mt-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"><span style={{
                  fontSize: "14px",
                  lineHeight: "normal"
                }}>Follow Along</span></p>
                                <div className="mt-4 flex gap-3">
                                    {SOCIALS.map(s => {
                  const Icon = s.icon;
                  return <a key={s.label} href={s.href} aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition hover:border-secondary hover:bg-secondary hover:text-secondary-foreground">
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </a>;
                })}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal delay={0.1}>
                            <div className="rounded-2xl border border-border bg-muted/60 p-6 md:p-8">
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </main>;
}