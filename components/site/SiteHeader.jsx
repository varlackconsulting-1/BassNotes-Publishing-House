import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
import { BOOKS_CATALOG, SBH_TITLES } from '@/data/catalog';
export const STORE_URL = 'https://store.bassnotespublishing.com/';
export const NAV_ITEMS = [{
  to: '/',
  label: 'Home'
}, {
  to: '/about',
  label: 'About'
}, {
  to: '/books',
  label: 'Books',
  children: [{
    label: 'Adult',
    links: []
  }, {
    label: 'Young Adult',
    links: [{
      to: '/cosomnia',
      label: 'Cosomnia'
    }]
  }, {
    label: 'Children',
    links: [{
      to: '/super-bass-heroes',
      label: 'Super Bass Heroes'
    }]
  }]
}, {
  to: '/author',
  label: 'Author'
}, {
  to: '/partners',
  label: 'Partners'
}, {
  to: '/contact',
  label: 'Contact'
}];

/** Full site map kept for footer / secondary discovery */
export const SECONDARY_NAV = [{
  to: '/books',
  label: 'Books'
}, {
  to: '/partners',
  label: 'Partners'
}, {
  to: '/contact',
  label: 'Contact'
}];
const LOGO_URL = 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/dfb08b317a508f7b1f257263d8a6bfb2.png';
export function Wordmark({
  compact = false
}) {
  return <Link to="/" className="flex items-center" aria-label="Bass Notes Publishing home">
      <span className="font-display font-bold tracking-tight text-primary text-xl md:text-2xl">
        Bass Notes Publishing House
      </span>
    </Link>;
}
const SEARCH_INDEX = [...BOOKS_CATALOG.map(book => ({
  id: book.id,
  title: book.title,
  meta: `${book.author} · ${book.genre}`,
  to: book.detailsPath
})), ...SBH_TITLES.filter(book => book.id !== 'sbh-series').map(book => ({
  id: book.id,
  title: book.title,
  meta: 'Super Bass Heroes · Torin Varlack',
  to: '/super-bass-heroes'
}))];
function HeaderLogo() {
  return <Link to="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-3" aria-label="Bass Notes Publishing home"><img src="https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/dfb08b317a508f7b1f257263d8a6bfb2.png" alt="" className="h-16 w-auto max-w-[10rem] shrink-0 object-contain object-left sm:h-20 sm:max-w-[12rem] md:h-24 md:max-w-none" /></Link>;
}
function TopSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];
    return SEARCH_INDEX.filter(item => `${item.title} ${item.meta}`.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);
  const go = event => {
    event.preventDefault();
    const q = query.trim();
    setFocused(false);
    navigate(q ? `/bookstore?q=${encodeURIComponent(q)}` : '/bookstore');
  };
  return <form onSubmit={go} className="relative mx-auto flex w-full max-w-3xl items-center" role="search">
      <label htmlFor="site-book-search" className="sr-only">
        Search by title, author, or keyword
      </label>
      <input id="site-book-search" value={query} onChange={event => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => setTimeout(() => setFocused(false), 160)} placeholder="Search by Title, Author, Keyword" className="h-9 w-full rounded-l-md border border-[#d5dee8] bg-[#f7f9fc] px-3 text-sm text-foreground outline-none placeholder:text-[#8a97a6] focus:border-primary focus:bg-white md:h-10 md:px-4" />
      <button type="submit" aria-label="Search books" className="flex h-9 w-11 shrink-0 items-center justify-center rounded-r-md bg-primary text-primary-foreground transition hover:brightness-110 active:scale-[0.98] md:h-10 md:w-12">
        <Search className="h-4 w-4" strokeWidth={2.4} />
      </button>
      {focused && matches.length > 0 && <ul className="absolute left-0 right-11 top-full z-50 mt-1 overflow-hidden rounded-md border border-border bg-background py-1 shadow-[0_16px_36px_-18px_rgba(10,61,98,0.35)] md:right-12">
          {matches.map(item => <li key={item.id}>
              <Link to={item.to} className="block px-3 py-2.5 text-left hover:bg-muted" onMouseDown={event => event.preventDefault()}>
                <span className="block text-sm font-semibold text-primary">{item.title}</span>
                <span className="block text-xs text-muted-foreground">{item.meta}</span>
              </Link>
            </li>)}
          <li>
            <button type="submit" className="block w-full px-3 py-2.5 text-left text-sm font-semibold text-foreground hover:bg-muted">
              Search the bookstore for “{query.trim()}”
            </button>
          </li>
        </ul>}
    </form>;
}
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    setBooksOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  return <div className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-[#e4ebf2] bg-white">
        <div className="flex h-12 items-center px-3 md:h-14 md:px-4">
          <TopSearch />
        </div>
      </div>
    <header className={`transition-all duration-300 ${scrolled || open ? 'border-b border-border bg-background/95 shadow-[0_4px_24px_-12px_rgba(10,61,98,0.18)] backdrop-blur-md' : 'border-b border-transparent bg-background'}`}>
      <div className="relative flex h-20 w-full items-center justify-between pl-1 pr-3 sm:pl-2 md:h-28 md:pl-2 md:pr-5">
        <HeaderLogo />
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9" aria-label="Primary">
          {NAV_ITEMS.map(item => item.children ? <div key={item.to} className="relative" onMouseEnter={() => setBooksOpen(true)} onMouseLeave={() => setBooksOpen(false)}>
                <NavLink to={item.to} className={({
              isActive
            }) => `flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}>
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${booksOpen ? 'rotate-180' : ''}`} />
                </NavLink>
                <AnimatePresence>
                  {booksOpen && <motion.div initial={{
                opacity: 0,
                y: 8
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: 8
              }} transition={{
                duration: 0.18
              }} className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">
                      <div className="overflow-hidden rounded-xl border border-border bg-background py-2 shadow-[0_18px_40px_-20px_rgba(10,61,98,0.3)]">
                        {item.children.map(category => <div key={category.label} className="px-2 py-1.5">
                            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                              {category.label}
                            </p>
                            {category.links.map(child => <NavLink key={child.to} to={child.to} className={({
                      isActive
                    }) => `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-primary/5 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-primary'}`}>
                                {child.label}
                              </NavLink>)}
                          </div>)}
                      </div>
                    </motion.div>}
                </AnimatePresence>
              </div> : <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({
            isActive
          }) => `text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}>
                {item.label}
              </NavLink>)}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-secondary px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-secondary-foreground transition hover:brightness-110 active:scale-[0.98] sm:inline-flex">
            Shop Books
          </a>
          <button type="button" onClick={() => setOpen(v => !v)} className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary transition hover:border-primary/60 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} transition={{
          duration: 0.25
        }} className="fixed inset-0 z-40 flex flex-col bg-background pt-32 md:pt-[10.5rem] lg:hidden">
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8" aria-label="Mobile">
              {NAV_ITEMS.map((item, i) => item.children ? <div key={item.to}>
                    <motion.div initial={{
                opacity: 0,
                y: 16
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.05 * i,
                duration: 0.3,
                ease: 'easeOut'
              }}>
                      <NavLink to={item.to} end className={({
                  isActive
                }) => `group flex items-center justify-between border-b border-border py-4 font-display text-3xl tracking-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
                        {item.label}
                        <ArrowUpRight className="h-6 w-6 text-muted-foreground transition group-hover:text-secondary" />
                      </NavLink>
                    </motion.div>
                    <div className="space-y-3 border-b border-border pb-4 pl-2">
                      {item.children.map(category => <div key={category.label}>
                          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                            {category.label}
                          </p>
                          <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {category.links.map(child => <NavLink key={child.to} to={child.to} className={({
                      isActive
                    }) => `text-sm font-semibold transition-colors ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'}`}>
                                {child.label}
                              </NavLink>)}
                          </div>
                        </div>)}
                    </div>
                  </div> : <motion.div key={item.to} initial={{
              opacity: 0,
              y: 16
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.05 * i,
              duration: 0.3,
              ease: 'easeOut'
            }}>
                    <NavLink to={item.to} end={item.to === '/'} className={({
                isActive
              }) => `group flex items-center justify-between border-b border-border py-4 font-display text-3xl tracking-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
                      {item.label}
                      <ArrowUpRight className="h-6 w-6 text-muted-foreground transition group-hover:text-secondary" />
                    </NavLink>
                  </motion.div>)}
            </nav>
            <div className="space-y-3 px-8 pb-10">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center rounded-full bg-secondary py-4 text-sm font-bold uppercase tracking-[0.2em] text-secondary-foreground transition active:scale-[0.98]">
                Shop Books
              </a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>
    </div>;
}