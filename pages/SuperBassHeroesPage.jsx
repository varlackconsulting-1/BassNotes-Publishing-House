import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowUpRight, Music2 } from 'lucide-react';
import Reveal from '@/components/Reveal';
import Seo from '@/components/Seo';
import { SBH_AUDIENCE, SBH_TITLES, SUPER_BASS_COLLECTION, SUPER_BASS_HERO_COVER } from '@/data/catalog';
export const STORE_URL = 'https://store.bassnotespublishing.com/';
const JACQUEY_SCREENS = 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/52b6128ef18ec0720bd6586b7b562a7a.png';
const PRIMARY_BTN = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground transition duration-200 hover:brightness-110 active:scale-[0.98]';
const GHOST_BTN = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-foreground transition duration-200 hover:border-primary/60 hover:text-primary active:scale-[0.98]';
const NOTES = [{
  glyph: '♪',
  top: '12%',
  left: '6%',
  delay: '0s',
  size: 'text-3xl',
  color: 'text-secondary'
}, {
  glyph: '♫',
  top: '28%',
  left: '88%',
  delay: '1.2s',
  size: 'text-4xl',
  color: 'text-accent'
}, {
  glyph: '★',
  top: '62%',
  left: '8%',
  delay: '0.6s',
  size: 'text-2xl',
  color: 'text-secondary'
}, {
  glyph: '♬',
  top: '74%',
  left: '92%',
  delay: '2s',
  size: 'text-3xl',
  color: 'text-primary'
}, {
  glyph: '✧',
  top: '18%',
  left: '72%',
  delay: '1.6s',
  size: 'text-xl',
  color: 'text-accent'
}];
const TITLES_NOTES = [
  { glyph: '♪', top: '8%', left: '5%', delay: '0s', size: 'text-3xl', color: '#e36a1e' },
  { glyph: '♫', top: '16%', left: '90%', delay: '1.4s', size: 'text-5xl', color: '#0a3d62' },
  { glyph: '♥', top: '24%', left: '14%', delay: '0.8s', size: 'text-2xl', color: '#2faa5e' },
  { glyph: '♫', top: '34%', left: '82%', delay: '2.1s', size: 'text-4xl', color: '#1aa7c4' },
  { glyph: '♥', top: '44%', left: '7%', delay: '1.1s', size: 'text-xl', color: '#9b3fb8' },
  { glyph: '♬', top: '52%', left: '88%', delay: '0.4s', size: 'text-3xl', color: '#e23d8c' },
  { glyph: '♥', top: '60%', left: '12%', delay: '1.8s', size: 'text-2xl', color: '#f0b429' },
  { glyph: '♬', top: '70%', left: '84%', delay: '0.9s', size: 'text-4xl', color: '#0a3d62' },
  { glyph: '♪', top: '80%', left: '18%', delay: '2.4s', size: 'text-2xl', color: '#e36a1e' },
  { glyph: '♥', top: '88%', left: '78%', delay: '1.6s', size: 'text-xl', color: '#2faa5e' },
  { glyph: '♫', top: '92%', left: '40%', delay: '0.6s', size: 'text-3xl', color: '#9b3fb8' },
  { glyph: '♥', top: '12%', left: '48%', delay: '2.8s', size: 'text-xl', color: '#e23d8c' },
];
function FloatingNotes() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {NOTES.map(note => <span key={`${note.glyph}-${note.left}`} className={`sbh-drift absolute font-display ${note.size} ${note.color} opacity-70`} style={{
      top: note.top,
      left: note.left,
      animationDelay: note.delay
    }}>
                    {note.glyph}
                </span>)}
        </div>;
}
function TitlesFloatingNotes() {
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {TITLES_NOTES.map((note, i) => <span key={`${note.glyph}-${i}`} className="sbh-drift absolute font-display ${note.size} opacity-75" style={{
      top: note.top,
      left: note.left,
      color: note.color,
      animationDelay: note.delay
    }}>
                    {note.glyph}
                </span>)}
        </div>;
}
function TitleCard({
  title,
  index
}) {
  return <article className="group flex h-full flex-col">
            <div className="sbh-bob relative flex items-end justify-center" style={{
      animationDelay: `${index * 0.35}s`
    }}>
                <img src={title.cover} alt={`${title.seriesName} — ${title.title}, illustrated and written by Torin Varlack`} className="h-auto w-full object-contain drop-shadow-[0_22px_28px_rgba(10,61,98,0.28)] transition duration-300 group-hover:-translate-y-1" loading="lazy" decoding="async" />
            </div>
            <div className="mt-4 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                    {title.seriesName}
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold text-foreground">{title.title}</h3>
                <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-9 items-center justify-center rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary-foreground transition hover:brightness-110 active:scale-[0.98]">
                    {index === 0 ? 'Buy Now' : 'Pre-order'}
                </a>
            </div>
        </article>;
}
export default function SuperBassHeroesPage() {
  return <main className="bg-background">
            <Helmet>
                <title>Super Bass Heroes — BassNotes Publishing House</title>
                <meta name="description" content="Super Bass Heroes by Torin Varlack — illustrated books for elementary readers, ages 8–11 and grades 3–5. Jam Jam, Jacquey, Big Toe, Davy, and Super Bass Heroes. Coming 2027." />
            </Helmet>
            <Seo title="Super Bass Heroes — BassNotes Publishing House" description="Illustrated books by Torin Varlack for ages 8–11 and grades 3–5. Music. Adventure. Imagination. Literacy. Coming 2027." image={SUPER_BASS_COLLECTION} siteName="BassNotes" url="/super-bass-heroes" />

            <section className="relative overflow-hidden border-b border-border/40">
                <div className="pointer-events-none absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 15% 10%, hsl(30 89% 55% / 0.16), transparent 55%), radial-gradient(ellipse 60% 45% at 90% 80%, hsl(186 56% 58% / 0.22), transparent 50%), radial-gradient(ellipse 50% 40% at 50% 0%, hsl(205 82% 21% / 0.06), transparent 60%)'
      }} aria-hidden="true" />
                <FloatingNotes />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-36 md:pb-24 md:pt-[12.5rem] lg:grid-cols-12 lg:gap-8">
                    <div className="lg:col-span-4">
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                BassNotes Publishing House
                            </p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                                Super Bass Heroes
                            </h1>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-4 text-sm font-bold uppercase tracking-[0.28em] text-secondary">
                                Music. Adventure. Imagination. Literacy.
                            </p>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"><span style={{
                fontSize: "16px",
                lineHeight: "normal"
              }}><span style={{
                  color: "rgb(108, 108, 108)",
                  fontFamily: "\"Open Sans\""
                }}>Join the Super Bass Heroes on an imaginative musical adventure to discover why the world needs bass, inspiring creativity, curiosity, and a love for music in young readers.</span></span></p>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <p className="mt-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                                {SBH_AUDIENCE}
                            </p>
                        </Reveal>
                        <Reveal delay={0.22}>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className={GHOST_BTN}>
                                    Shop Books
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-8">
                        <Reveal delay={0.08}>
                            <div className="relative">
                                <img src="https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/5bd2fbe54661f01f2114f2160ee734ee.png" alt="Super Bass Heroes collection shown on a hardcover book, laptop, tablet, and phone" className="mx-auto h-auto w-full max-w-3xl object-contain" loading="eager" decoding="async" />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-b border-border/40">
                <div className="mx-auto grid max-w-5xl gap-4 px-6 py-8 sm:grid-cols-3">
                    {[['Elementary', 'Built for grades 3–5'], ['Ages 8–11', 'Readers ready to play along'], ['Coming Soon', 'Meet the Next Generation of Heroes']].map(([label, line]) => <p key={label} className="rounded-2xl bg-muted px-5 py-4 text-center">
                            <span className="block font-display text-xl font-semibold text-primary">{label}</span>
                            <span className="mt-1 block text-sm text-muted-foreground">{line}</span>
                        </p>)}
                </div>
            </section>

            <section id="titles" className="relative overflow-hidden border-b border-border/40">
                <TitlesFloatingNotes />
                <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
                    <Reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">The collection</p>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                            Five books. One big sound.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <p className="mt-4 max-w-2xl text-muted-foreground">
                            Every cover below is from the Super Bass Heroes collection. Titles are shown
                            exactly as they appear on the books.
                        </p>
                    </Reveal>
                    <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {SBH_TITLES.map((title, i) => <Reveal key={title.id} delay={i * 0.06}>
                                <TitleCard title={title} index={i} />
                            </Reveal>)}
                    </div>
                </div>
            </section>

            <section className="border-b border-border/40 bg-muted/60">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-20">
                    <Reveal>
                        <img src={JACQUEY_SCREENS} alt="Jacquey cover art shown on a tablet and a phone" className="h-auto w-full object-contain" loading="lazy" decoding="async" />
                    </Reveal>
                    <div>
                        <Reveal>
                            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                                Art that travels
                            </p>
                        </Reveal>
                        <Reveal delay={0.06}>
                            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">Big enough for any screen</h2>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-4 leading-relaxed text-muted-foreground">
                                Books available on ebook and hardcover.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="border-b border-border/40">
                <div className="mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
                    <Reveal>
                        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                            <Music2 className="h-3.5 w-3.5" />
                            Music &amp; sound
                        </p>
                    </Reveal>
                    <Reveal delay={0.06}>
                        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                            A series that sounds as good as it reads
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground">
                            Original songs arrive with the Super Bass Heroes world — beats built in Houston,
                            for the page and the screen. Music releases will be featured here and on the Music
                            page as they drop.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <Link to="/music" className={`${GHOST_BTN} mt-8`}>
                            Explore Music
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Reveal>
                </div>
            </section>

            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: "url('https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/websitebackgroundwsbh-uJD3l.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} aria-hidden="true" />
                <div className="pointer-events-none absolute inset-0 bg-background/75" aria-hidden="true" />
                <div className="relative mx-auto max-w-3xl px-6 py-16 text-center md:py-24">
                    <Reveal delay={0.06}>
                        <p className="mt-6 font-display text-2xl italic leading-snug text-foreground md:text-3xl">
                            Every hero starts with a first note.
                        </p>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-4 text-muted-foreground">
                            Super Bass Heroes arrives in 2027 for elementary readers, {SBH_AUDIENCE.toLowerCase()}.
                        </p>
                    </Reveal>
                    <Reveal delay={0.14}>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link to="/books" className={PRIMARY_BTN}>
                                Back to Books
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link to="/cosomnia" className={GHOST_BTN}>
                                Discover Cosomnia
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>;
}