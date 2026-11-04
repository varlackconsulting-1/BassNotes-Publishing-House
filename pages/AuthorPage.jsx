import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, GraduationCap, Music2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
const TORIN_PORTRAIT = 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/torin_headshot-website-pB2JO.png';
const SLIDES = [{
  n: '01',
  icon: BookOpen,
  heading: 'The Author',
  paragraphs: ['As both an author and illustrator, Torin creates God-breathed stories across age groups and genres that examine and challenge the human condition. Through compelling characters, imaginative worlds, and original illustrations, each work invites readers into stories that linger long after the final page.']
}, {
  n: '02',
  icon: GraduationCap,
  heading: 'The Educator',
  paragraphs: ['An experienced educator specializing in English, African American Studies, Creative Writing, Sociology, and Psychology. Teaching grades 9–12, he strengthens test scores, reading comprehension, writing, and analytical thinking through engaging, high-quality instruction.', 'That same educational foundation shapes every BassNotes work. Each project is intentionally designed with educators and students in mind, serving as both compelling literature and meaningful real-world learning experiences.'],
  stats: [{
    value: '89%',
    label: 'ELA 1 STAAR Passing Rate'
  }, {
    value: '83%',
    label: 'African American Studies AP'
  }, {
    value: '91%',
    label: 'ELA 2 Passing Rate'
  }]
}, {
  n: '03',
  icon: Music2,
  heading: 'The Musician',
  paragraphs: ['A lifelong musician and passionate bassist, Torin’s deep appreciation for the bass guitar shapes his musical identity. His musicianship extends to guitar, keys, composition, and music production.', 'He personally writes, composes, arranges, and produces every original BassNotes soundtrack, ensuring each note serves the story with purpose, emotion, and intention.']
}];
const PRIMARY_BTN = 'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
export default function AuthorPage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const go = useCallback(next => {
    setDirection(next > 0 ? 1 : -1);
    setIndex(prev => (prev + next + SLIDES.length) % SLIDES.length);
  }, []);
  const goTo = useCallback(target => {
    setDirection(target > index ? 1 : -1);
    setIndex(target);
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') go(1);else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);
  const slide = SLIDES[index];
  const Icon = slide.icon;
  const variants = {
    enter: dir => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * 60
    }),
    center: {
      opacity: 1,
      x: 0
    },
    exit: dir => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir * -60
    })
  };
  return <main>
            <Helmet>
                <title>Meet Torin Varlack — Author · Educator · Musician | Bass Notes Publishing</title>
                <meta name="description" content="Meet Torin Varlack — author, educator, and musician creating immersive story worlds through original literature, music, and characters. One vision. Bass Notes Publishing." />
            </Helmet>
            <Seo title="Meet Torin Varlack — Author · Educator · Musician" description="Author, educator, and musician creating immersive story worlds through original literature, music, and characters." siteName="Bass Notes Publishing" image={TORIN_PORTRAIT} />

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-border/60 pb-20 pt-48 md:pb-28 md:pt-[14.5rem]">
                <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.16),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.12),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-5xl px-6 text-center">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <span className="h-px w-10 bg-primary/60" />
                            Meet the Creator
                            <span className="h-px w-10 bg-primary/60" />
                        </p>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight text-primary">
                            Meet Torin Varlack
                        </h1>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Author. Educator. Illustrator. Musician. Creator.</p>
                    </Reveal>
                </div>
            </section>

            {/* SLIDE CAROUSEL */}
            <section className="bg-background" aria-roledescription="carousel" aria-label="Torin Varlack — Author, Educator, Musician">
                <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                    <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/40 shadow-[0_30px_70px_-40px_rgba(10,61,98,0.35)]">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div key={slide.n} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }} className="grid items-stretch md:grid-cols-2" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${SLIDES.length}: ${slide.heading}`}>
                                {/* TEXT */}
                                <div className="order-2 flex flex-col justify-center p-8 md:order-1 md:p-12 lg:p-16">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                                            <Icon className="h-5 w-5" strokeWidth={1.75} />
                                        </span>
                                        <span className="text-xs font-bold tracking-[0.3em] text-muted-foreground">
                                            {slide.n} / 03
                                        </span>
                                    </div>
                                    <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                                        {slide.heading}
                                    </h2>
                                    <div className="mt-6 space-y-5">
                                        {slide.paragraphs.map((p, i) => <p key={i} className="text-lg leading-relaxed text-foreground/85">
                                                {p}
                                            </p>)}
                                    </div>
                                    {slide.stats ? <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                            {slide.stats.map(stat => <div key={stat.label} className="rounded-sm bg-[#6b4a1e] px-3 py-5 text-center text-white shadow-[0_8px_18px_-10px_rgba(60,36,8,0.7)]">
                                                    <p className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{stat.value}</p>
                                                    <span className="mx-auto mt-2 block h-px w-10 bg-white/70" />
                                                    <p className="mt-2 text-[11px] font-semibold uppercase leading-snug tracking-[0.08em]">{stat.label}</p>
                                                </div>)}
                                        </div> : null}

                                </div>

                                {/* IMAGE */}
                                <div className="relative order-1 flex min-h-[320px] items-center justify-center overflow-hidden bg-[#1a1a1a] md:order-2 md:min-h-[520px]">
                                    <img src={TORIN_PORTRAIT} alt="Portrait of Torin Varlack" className="h-full max-h-[520px] w-full object-contain object-top" loading="eager" decoding="async" />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* ARROWS */}
                        <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-md backdrop-blur transition hover:border-primary hover:bg-primary hover:text-primary-foreground md:left-5">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button type="button" onClick={() => go(1)} aria-label="Next slide" className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-primary shadow-md backdrop-blur transition hover:border-primary hover:bg-primary hover:text-primary-foreground md:right-5">
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* DOTS */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        {SLIDES.map((s, i) => <button key={s.n} type="button" onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}: ${s.heading}`} aria-current={i === index} className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-primary' : 'w-2.5 bg-border hover:bg-primary/40'}`} />)}
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="relative overflow-hidden border-t border-border/60 bg-secondary/15">
                <div className="pointer-events-none absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,hsl(var(--secondary)/0.16),transparent_70%)] blur-3xl" />
                <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
                    <Reveal>
                        <h2 className="font-display text-4xl font-semibold tracking-tight text-primary md:text-5xl">
                            Explore the World of BassNotes
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            Discover stories, music, and educational experiences designed to inspire imagination,
                            strengthen literacy, and celebrate culture.
                        </p>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/books" className={PRIMARY_BTN}>
                                Explore BassNotes
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>;
}