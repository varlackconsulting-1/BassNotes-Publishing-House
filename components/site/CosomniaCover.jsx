import React from 'react';

import { COSOMNIA_COVER, COSOMNIA_COVER_3D, COSOMNIA_MOCKUP } from '@/data/catalog';

const COVER_URL = COSOMNIA_COVER;
const COVER_3D_URL = COSOMNIA_COVER_3D;
const MOCKUP_URL = COSOMNIA_MOCKUP;

export default function CosomniaCover({ className = '', variant = 'flat' }) {
    const src = variant === 'mockup' ? MOCKUP_URL : variant === '3d' ? COVER_3D_URL : COVER_URL;
    const isMockup = variant === 'mockup';
    return (
        <div className={`relative w-full select-none overflow-hidden border-0 bg-transparent shadow-none ${className}`}>
            <img
                src={src}
                alt={
                    isMockup
                        ? 'Cosomnia by Torin Varlack — book and phone presentation'
                        : 'Cosomnia by Torin Varlack — official book cover'
                }
                className="h-auto w-full bg-transparent object-contain"
                loading="lazy"
                decoding="async"
            />
        </div>
    );
}

export { COVER_URL, COVER_3D_URL, MOCKUP_URL };
