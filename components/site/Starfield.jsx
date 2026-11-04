import React, { useMemo } from 'react';

export default function Starfield({ density = 70, className = '' }) {
    const stars = useMemo(
        () =>
            Array.from({ length: density }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 2 + 1,
                delay: Math.random() * 6,
                duration: 3 + Math.random() * 5,
                opacity: 0.25 + Math.random() * 0.65,
            })),
        [density]
    );

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            {stars.map((s) => (
                <span
                    key={s.id}
                    className="star"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}
