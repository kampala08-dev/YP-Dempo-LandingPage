import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY, gallerySrc } from "../data/gallery";
import { pauseSmoothScroll, resumeSmoothScroll } from "../hooks/useLenis";

const SWIPE_MIN_PX = 50;

export default function Gallery() {
    const [index, setIndex] = useState(null);
    const touchX = useRef(null);
    const opener = useRef(null); // tombol foto yang membuka lightbox, untuk mengembalikan fokus
    const open = index !== null;
    const count = GALLERY.length;

    const go = useCallback(
        (step) => setIndex((i) => (i === null ? i : (i + step + count) % count)),
        [count]
    );

    // Lightbox: panah kiri/kanan untuk pindah foto, smooth scroll dijeda selama terbuka
    useEffect(() => {
        if (!open) return undefined;
        pauseSmoothScroll();
        const onKey = (e) => {
            if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            resumeSmoothScroll();
        };
    }, [open, go]);

    // Muat lebih dulu foto besar sebelum & sesudahnya agar perpindahan terasa instan
    useEffect(() => {
        if (!open) return;
        [index - 1, index + 1].forEach((i) => {
            const img = new Image();
            img.src = gallerySrc(GALLERY[(i + count) % count], 1800);
        });
    }, [open, index, count]);

    const onTouchStart = (e) => {
        touchX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) >= SWIPE_MIN_PX) go(dx < 0 ? 1 : -1);
    };

    const active = open ? GALLERY[index] : null;

    return (
        <section
            id="galeri"
            data-testid="gallery-section"
            className="relative py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal shadow-sm">
                        <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                        Galeri Kegiatan
                    </div>
                    <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                        Belajar, bergerak, dan{" "}
                        <span className="text-yamet-teal">tumbuh bersama.</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                        Sekilas suasana sesi terapi di YAMET Palembang Dempo — ruang yang aman,
                        alat yang lengkap, dan terapis yang mendampingi setiap langkah si kecil.
                    </p>
                </motion.div>

                <ul className="mt-14 columns-2 gap-3 sm:gap-4 lg:columns-3" data-testid="gallery-grid">
                    {GALLERY.map((item, i) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                            className="mb-3 break-inside-avoid sm:mb-4"
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    opener.current = e.currentTarget;
                                    setIndex(i);
                                }}
                                aria-label={`Perbesar foto: ${item.caption}`}
                                data-testid={`gallery-item-${i}`}
                                className="group relative block w-full overflow-hidden rounded-2xl bg-yamet-teal-50 shadow-soft ring-1 ring-yamet-ink/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yamet-teal/50"
                            >
                                <img
                                    src={gallerySrc(item, 800)}
                                    srcSet={`${gallerySrc(item, 480)} 480w, ${gallerySrc(item, 800)} 800w`}
                                    sizes="(min-width: 1024px) 400px, 50vw"
                                    width={item.w}
                                    height={item.h}
                                    alt={item.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                />
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent px-3 pb-3 pt-10 text-left text-xs font-bold leading-snug text-white sm:px-4 sm:pb-4 sm:text-sm"
                                >
                                    {item.caption}
                                </span>
                            </button>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && setIndex(null)}>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                    <DialogPrimitive.Content
                        data-lenis-prevent
                        data-testid="gallery-lightbox"
                        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onCloseAutoFocus={(e) => {
                            // Radix hanya mengembalikan fokus ke <Dialog.Trigger>; galeri dibuka lewat state
                            e.preventDefault();
                            opener.current?.focus({ preventScroll: true });
                        }}
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-4 py-14 focus:outline-none sm:px-20"
                    >
                        {active && (
                            <>
                                <DialogPrimitive.Title className="sr-only">{active.caption}</DialogPrimitive.Title>
                                <DialogPrimitive.Description className="sr-only">{active.alt}</DialogPrimitive.Description>
                                <img
                                    key={active.id}
                                    src={gallerySrc(active, 1800)}
                                    alt={active.alt}
                                    width={active.w}
                                    height={active.h}
                                    className="h-auto max-h-[78vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                                />
                                <p className="mt-4 flex items-center gap-3 text-sm text-white/90" aria-live="polite">
                                    <span className="font-bold">{active.caption}</span>
                                    <span className="text-white/50">
                                        {index + 1} / {count}
                                    </span>
                                </p>

                                <button
                                    type="button"
                                    onClick={() => go(-1)}
                                    aria-label="Foto sebelumnya"
                                    className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(1)}
                                    aria-label="Foto berikutnya"
                                    className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                                <DialogPrimitive.Close
                                    aria-label="Tutup"
                                    className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:top-6"
                                >
                                    <X className="h-6 w-6" />
                                </DialogPrimitive.Close>
                            </>
                        )}
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
        </section>
    );
}
