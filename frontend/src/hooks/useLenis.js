import { useEffect } from "react";
import Lenis from "lenis";

/* Buttery smooth scrolling (à la premium agency sites, e.g. oryzo.ai).
   Desktop (wheel) gets the interpolated smooth scroll; touch devices keep
   their native scroll by default (fast & jank-free — important for mobile).
   Disabled entirely under prefers-reduced-motion. Anchor links are routed
   through Lenis so in-page navigation eases smoothly too. */
let activeLenis = null;

/* Overlay layar penuh (mis. lightbox galeri) menghentikan smooth scroll selama terbuka,
   supaya roda mouse tidak ikut menggulir halaman di belakangnya. */
export function pauseSmoothScroll() {
    activeLenis?.stop();
}

export function resumeSmoothScroll() {
    activeLenis?.start();
}

export default function useLenis() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        activeLenis = lenis;

        let raf = 0;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        // Smooth in-page anchor navigation (nav links, CTAs, footer, etc.)
        const onClick = (e) => {
            const a = e.target.closest?.('a[href^="#"]');
            if (!a) return;
            const href = a.getAttribute("href");
            if (href && href.length > 1) {
                const el = document.querySelector(href);
                if (el) {
                    e.preventDefault();
                    lenis.scrollTo(el, { offset: -80 });
                }
            }
        };
        document.addEventListener("click", onClick);

        return () => {
            cancelAnimationFrame(raf);
            document.removeEventListener("click", onClick);
            lenis.destroy();
            if (activeLenis === lenis) activeLenis = null;
        };
    }, []);
}
