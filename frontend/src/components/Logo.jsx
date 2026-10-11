import React, { useState } from "react";

/* Uses the real brand logo at /logo-yamet.png once it is added to public/.
   Until then (or if it fails to load) it gracefully falls back to a simple
   built-in mark so the navbar/footer never break. */
export default function Logo({ className = "h-9" }) {
    const [imgOk, setImgOk] = useState(true);

    if (imgOk) {
        return (
            <img
                src="/logo-yamet.png"
                alt="YAMET Palembang Dempo"
                className={`${className} w-auto select-none`}
                draggable="false"
                onError={() => setImgOk(false)}
                data-testid="yamet-logo"
            />
        );
    }

    return (
        <div className={`flex items-center gap-2.5 ${className}`} data-testid="yamet-logo">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-yamet-teal shadow-soft">
                {/* Playful star + heart-ish glyph */}
                <svg viewBox="0 0 32 32" className="h-6 w-6 text-white" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M16 4c1.6 3.6 4.4 6.4 8 8-3.6 1.6-6.4 4.4-8 8-1.6-3.6-4.4-6.4-8-8 3.6-1.6 6.4-4.4 8-8z"
                    />
                    <circle cx="16" cy="22.5" r="2.5" fill="#FFB5A7" />
                </svg>
            </div>
            <div className="leading-tight">
                <div className="font-heading text-lg font-black tracking-tight text-yamet-ink">
                    YAMET<span className="text-yamet-teal">.</span>
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-yamet-teal-600">
                    Palembang Dempo
                </div>
            </div>
        </div>
    );
}
