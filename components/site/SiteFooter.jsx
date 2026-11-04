import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { openCookiePreferences } from '@/lib/cookieConsent';
import { STORE_URL, Wordmark } from './SiteHeader';
const FOOTER_NAV = [{
  to: '/',
  label: 'Home'
}, {
  to: '/about',
  label: 'About'
}, {
  to: '/books',
  label: 'Books'
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
export default function SiteFooter() {
  return <footer className="border-t border-border bg-muted">
            <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
                <div className="grid gap-10 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Wordmark />
                        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">Creating classics for this generation. T<span style={{
              fontSize: "11pt",
              color: "rgb(92, 105, 122)",
              caretColor: "currentcolor"
            }}>imeless stories that advance literacy, celebrate
African American voices, and inspire generations through original literature,
music, and media.</span><p className="MsoNormal" style={{
              marginBottom: "0in"
            }}><span style={{
                fontSize: "11.0pt",
                msoBidiFontSize: "16.0pt"
              }}><o:p></o:p></span></p></p>
                        <a href="mailto:hello@bassnotespublishing.com" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary">
                            hello@bassnotespublishing.com
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                    <div className="md:col-span-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Explore
                        </p>
                        <ul className="mt-5 grid grid-cols-2 gap-3">
                            {FOOTER_NAV.map(link => <li key={link.label}>
                                    <Link to={link.to} className="text-sm text-foreground/80 transition-colors hover:text-primary">
                                        {link.label}
                                    </Link>
                                </li>)}
                        </ul>
                    </div>
                    <div className="md:col-span-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                            Shop
                        </p>
                        <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-secondary">
                            Visit the shop
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
                <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs tracking-[0.1em] text-muted-foreground md:flex-row md:items-center md:justify-between">
                    <p className="uppercase">© {new Date().getFullYear()} Bass Notes Publishing. All Rights Reserved.</p>
                    <button type="button" onClick={openCookiePreferences} className="w-fit text-left uppercase tracking-[0.1em] text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                        Cookie settings
                    </button>
                    <p className="normal-case tracking-normal text-[11px] leading-relaxed md:text-right">
                        Bass Notes Publishing is a publishing and media brand of BassNotes LLC.
                    </p>
                </div>
            </div>
        </footer>;
}