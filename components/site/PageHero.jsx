import React from 'react';
import Reveal from '@/components/Reveal';

export default function PageHero({ kicker, title, children }) {
    return (
        <section className="relative overflow-hidden border-b border-border/60 pb-16 pt-48 md:pb-20 md:pt-[14.5rem]">
            <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.15),transparent_70%)] blur-3xl" />
            <div className="relative mx-auto max-w-6xl px-6">
                <Reveal>
                    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                        <span className="h-px w-10 bg-primary/60" />
                        {kicker}
                    </p>
                </Reveal>
                <Reveal delay={0.08}>
                    <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
                        {title}
                    </h1>
                </Reveal>
                {children ? (
                    <Reveal delay={0.16}>
                        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</p>
                    </Reveal>
                ) : null}
            </div>
        </section>
    );
}
