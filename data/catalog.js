/** Shared publishing catalog — books, characters, store products */

export const COSOMNIA_COVER =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/0c5d4fff6bed348ac6d4ac6e1052061f.png';

export const COSOMNIA_COVER_3D =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/0c5d4fff6bed348ac6d4ac6e1052061f.png';

export const COSOMNIA_MOCKUP =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/22839d23aef3c58e77f4f52070b4e9c7.png';

export const SUPER_BASS_ART =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/big-sbh-bUjPD.png';

export const SUPER_BASS_COVER =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/sbhbookcover-website-3DuLe.png';

export const SUPER_BASS_COLLECTION =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/sbh-collection-mockup-2-Q06wY.png';

export const SUPER_BASS_HERO_COVER =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/test-kj1Lx.png';

export const SUPER_BASS_COLLECTION_FLOAT =
    'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/e86ae9ca1e5443e32f7bc7f42b7cc878.png';

export const COSOMNIA_BOOK_RELEASE_LABEL = 'Coming Soon · 2026';
export const DREAM_ON_RELEASE_LABEL = 'Coming Soon · 2026';

export const BOOKS_CATALOG = [
    {
        id: 'cosomnia',
        title: 'Cosomnia',
        tagline: 'Dream....On',
        author: 'Torin Varlack',
        series: 'Cosomnia Universe',
        volume: 'Vol. 01 · Teens & Young Adults',
        genre: 'Young Adult · Mystery · Adventure',
        readingLevel: 'YA / Ages 12+',
        status: 'coming',
        releaseDate: COSOMNIA_BOOK_RELEASE_LABEL,
        shortDescription:
            'A mysterious tech-driven adventure that challenges perception, exposes buried truths, and tests the courage to see reality.',
        description:
            'A mysterious, technology-driven young adult adventure that challenges perception, exposes buried truths, and tests the courage to see reality. The first original property from BassNotes Publishing House — opening a larger universe of story, sound, and film.',
        cover: COSOMNIA_COVER,
        storePath: '/store#cosomnia',
        detailsPath: '/cosomnia',
    },
    {
        id: 'super-bass-heroes',
        title: 'Super Bass Heroes',
        tagline: 'Music. Adventure. Imagination. Literacy.',
        author: 'Torin Varlack',
        series: 'Super Bass Heroes',
        volume: 'Vol. 02 · Ages 8–11 · Grades 3–5',
        genre: 'Elementary · Adventure · Music',
        readingLevel: 'Ages 8–11 · Grades 3–5',
        status: 'coming',
        releaseDate: '2027',
        shortDescription:
            'A fun, music-filled journey that teaches teamwork, confidence, and the importance of using your talents to help others.',
        description:
            'A fun, music-filled journey that teaches teamwork, confidence, and the importance of using your talents to help others. An original story universe combining music, adventure, imagination, and literacy — built for classrooms, libraries, and living rooms.',
        cover: SUPER_BASS_COVER,
        storePath: '/store#super-bass-heroes',
        detailsPath: '/super-bass-heroes',
    },
];

/**
 * Super Bass Heroes titles verified from official covers.
 * Names and credits are taken from the covers only — no invented plots or series numbers.
 */
export const SBH_AUDIENCE = 'Ages 8–11 · Grades 3–5';

export const SBH_TITLES = [
    {
        id: 'sbh-series',
        title: 'Super Bass Heroes',
        seriesName: 'Super Bass Heroes',
        cover: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/f4a60d2a39410c3b6841574baa9fad61.png',
        credit: 'Illustrated and written by Torin Varlack',
        verified: true,
        accent: '#0a3d62',
    },
    {
        id: 'sbh-jam-jam',
        title: 'Jam Jam',
        seriesName: 'Super Bass Heroes',
        cover: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/72f7f32da65c788800527e5a551b4989.png',
        credit: 'Illustrated and written by Torin Varlack',
        verified: true,
        accent: '#e36a1e',
    },
    {
        id: 'sbh-jacquey',
        title: 'Jacquey',
        seriesName: 'Super Bass Heroes',
        cover: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/197719f70be5d314acc0bbbd5542d932.png',
        credit: 'Illustrated and written by Torin Varlack',
        verified: true,
        accent: '#e23d8c',
    },
    {
        id: 'sbh-davy',
        title: 'Davy',
        seriesName: 'Super Bass Heroes',
        cover: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/davy-aYzzA.png',
        credit: 'Illustrated and written by Torin Varlack',
        verified: true,
        accent: '#f0b429',
    },
    {
        id: 'sbh-big-toe',
        title: 'Big Toe',
        seriesName: 'Super Bass Heroes',
        cover: 'https://horizons-cdn.hostinger.com/b5a94174-8448-4ef8-82bf-51380d53d199/big-toe-fBYTH.png',
        credit: 'Illustrated and written by Torin Varlack',
        verified: true,
        accent: '#1aa7c4',
    },
];

export const SERIES_INFO = [
    {
        id: 'cosomnia-universe',
        title: 'Cosomnia Universe',
        level: 'Young Adult',
        blurb: 'Dream-logic mystery and adventure for readers who love atmosphere, identity, and stories that hum after the last page.',
    },
    {
        id: 'super-bass',
        title: 'Super Bass Heroes',
        level: 'Ages 8–11 · Grades 3–5',
        blurb: 'Music-forward adventure for elementary readers — imagination, literacy, and classroom energy. Coming 2027.',
    },
];
