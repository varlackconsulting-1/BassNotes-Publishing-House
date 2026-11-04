import React from 'react';
import { BookOpen, Music2, Image as ImageIcon, Clapperboard } from 'lucide-react';

const VARIANTS = {
    cover: { ratio: 'aspect-[2/3]', Icon: BookOpen, label: 'Official cover art' },
    artwork: { ratio: 'aspect-square', Icon: Music2, label: 'Official artwork' },
    photo: { ratio: 'aspect-[3/4]', Icon: ImageIcon, label: 'Photography' },
    video: { ratio: 'aspect-video', Icon: Clapperboard, label: 'Video' },
};

export default function AssetPlaceholder({
    variant = 'cover',
    title,
    meta,
    note = 'Reserved for the final asset',
    className = '',
}) {
    const { ratio, Icon, label } = VARIANTS[variant] || VARIANTS.cover;

    return (
        <figure className={className}>
            <div
                className={`relative ${ratio} w-full overflow-hidden rounded-md border border-dashed border-border bg-secondary/40`}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.08),transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/60">
                        <Icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground/70">{note}</p>
                </div>
            </div>
            {title ? (
                <figcaption className="mt-4">
                    <p className="font-display text-lg leading-snug">{title}</p>
                    {meta ? <p className="mt-1 text-sm text-muted-foreground">{meta}</p> : null}
                </figcaption>
            ) : null}
        </figure>
    );
}
