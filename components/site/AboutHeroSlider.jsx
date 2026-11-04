import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INTERVAL_MS = 10000;

const SLIDES = [
    {
        src: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/a3230543541ea578f743c103dfaf354d.png',
        alt: 'Cosomnia by Torin Varlack — Dream... On... Coming soon December 15, 2026. Pre-order now.',
    },
    {
        src: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/3afde8a2221fcdab515f881b1d0aa288.png',
        alt: 'Dream... On..... Cosomnia by Torin Varlack, from BassNotes Publishing House. Learn more.',
    },
    {
        src: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/72318ad70eeac4ae3139849ee4859c66.png',
        alt: 'Super Bass Heroes — The Adventure Begins! Join a new generation of heroes who prove that creativity, character, and music can make a difference.',
    },
    {
        src: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/d5f1b290ae4224514fe59b4b5f513bad.png',
        alt: 'Super Bass Heroes collection coming soon. Join a new generation of heroes who prove that creativity, character, and music can make a difference.',
    },
];

export default function AboutHeroSlider() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const regionRef = useRef(null);
    const touchStartX = useRef(null);
    const reducedMotion = useRef(false);

    const go = useCallback((next) => {
        setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
    }, []);

    const next = useCallback(() => go(index + 1), [go, index]);
    const prev = useCallback(() => go(index - 1), [go, index]);

    useEffect(() => {
        reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    useEffect(() => {
        if (paused || reducedMotion.current) return undefined;
        const id = window.setInterval(() => {
            setIndex((current) => (current + 1) % SLIDES.length);
        }, INTERVAL_MS);
        return () => window.clearInterval(id);
    }, [paused, index]);

    const pause = () => setPaused(true);
    const resume = () => setPaused(false);

    const onKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            next();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            prev();
        }
    };

    const onTouchStart = (event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
        pause();
    };

    const onTouchEnd = (event) => {
        const start = touchStartX.current;
        touchStartX.current = null;
        if (start == null) return;
        const delta = (event.changedTouches[0]?.clientX ?? start) - start;
        if (Math.abs(delta) > 40) {
            if (delta < 0) next();
            else prev();
        }
    };

    return (
        <section
            ref={regionRef}
            className="relative bg-[#071018] pt-32 md:pt-[10.5rem]"
            aria-roledescription="carousel"
            aria-label="Featured BassNotes titles"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={(event) => {
                if (!regionRef.current?.contains(event.relatedTarget)) resume();
            }}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {SLIDES.map((slide, i) => (
                        <div
                            key={slide.src}
                            className="w-full shrink-0"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${i + 1} of ${SLIDES.length}`}
                            aria-hidden={i !== index}
                        >
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="block h-auto w-full"
                                draggable="false"
                                loading={i === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-md transition hover:bg-background active:scale-[0.98] md:left-5"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary shadow-md transition hover:bg-background active:scale-[0.98] md:right-5"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="flex items-center justify-center gap-2 py-3" role="tablist" aria-label="Slide position">
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.src}
                        type="button"
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => go(i)}
                        className={`h-2.5 rounded-full transition-all ${
                            i === index ? 'w-8 bg-secondary' : 'w-2.5 bg-white/50 hover:bg-white/80'
                        }`}
                    />
                ))}
                <span className="sr-only" aria-live="polite">
                    Slide {index + 1} of {SLIDES.length}
                    {paused ? ', paused' : ''}
                </span>
            </div>
        </section>
    );
}
