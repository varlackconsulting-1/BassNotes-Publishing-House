import React, { useEffect, useState } from 'react';
import {
    acceptAllCookies,
    hasConsentDecision,
    onCookiePreferencesRequested,
    rejectOptionalCookies,
    saveConsent,
} from '@/lib/cookieConsent';

export default function CookieBanner() {
    const [open, setOpen] = useState(false);
    const [prefs, setPrefs] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        setOpen(!hasConsentDecision());
        return onCookiePreferencesRequested(() => {
            setPrefs(true);
            setOpen(true);
        });
    }, []);

    if (!open) return null;

    function close() {
        setOpen(false);
        setPrefs(false);
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background p-4 shadow-[0_-12px_40px_-20px_rgba(10,61,98,0.35)] md:p-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-primary">Cookie settings</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        Bass Notes Publishing uses necessary cookies to run the site. Optional analytics and marketing
                        cookies load only if you allow them.
                    </p>
                    {prefs && (
                        <div className="mt-4 flex flex-col gap-2 text-sm text-foreground">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" checked disabled className="h-4 w-4" />
                                Necessary (always on)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={analytics}
                                    onChange={(e) => setAnalytics(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                Analytics
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={marketing}
                                    onChange={(e) => setMarketing(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                Marketing
                            </label>
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap gap-2">
                    {prefs ? (
                        <button
                            type="button"
                            className="min-h-11 rounded-full bg-primary px-5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground"
                            onClick={() => {
                                saveConsent({ analytics, marketing, platformAnalytics: analytics });
                                close();
                            }}
                        >
                            Save choices
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="min-h-11 rounded-full border border-border px-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
                            onClick={() => setPrefs(true)}
                        >
                            Customize
                        </button>
                    )}
                    <button
                        type="button"
                        className="min-h-11 rounded-full border border-border px-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
                        onClick={() => {
                            rejectOptionalCookies();
                            close();
                        }}
                    >
                        Reject optional
                    </button>
                    <button
                        type="button"
                        className="min-h-11 rounded-full bg-secondary px-5 text-xs font-bold uppercase tracking-[0.12em] text-secondary-foreground"
                        onClick={() => {
                            acceptAllCookies();
                            close();
                        }}
                    >
                        Accept all
                    </button>
                </div>
            </div>
        </div>
    );
}
