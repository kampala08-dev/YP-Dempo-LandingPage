import React, { useEffect, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowDownCircle, Baby, CalendarCheck, BadgeCheck, HeartHandshake } from "lucide-react";
import { waLink } from "../data/site";

// Lazy so three.js ships in its own chunk — never downloaded on mobile / no-WebGL.
const SensoryRoom3D = lazy(() => import("./SensoryRoom3D"));

// Dukungan WebGL dicek sekali saja (tiap getContext membuat konteks baru;
// dipanggil di setiap resize bisa menghabiskan jatah konteks browser).
let webglOk = null;
function hasWebGL() {
    if (webglOk !== null) return webglOk;
    try {
        const c = document.createElement("canvas");
        webglOk = Boolean(c.getContext("webgl2") || c.getContext("webgl"));
    } catch (e) {
        webglOk = false;
    }
    return webglOk;
}

function canRender3D() {
    if (typeof window === "undefined") return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return false;
    if (window.innerWidth < 1024) return false;
    return hasWebGL();
}

const trustBadges = [
    { icon: CalendarCheck, label: "Sejak tahun 2023" },
    { icon: BadgeCheck, label: "Tim terapis berpengalaman" },
    { icon: HeartHandshake, label: "Program individual per anak" },
];

function HeroCopy() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full border border-yamet-gold/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-brick shadow-sm backdrop-blur"
                data-testid="hero-eyebrow"
            >
                <Baby className="h-3.5 w-3.5" />
                Pusat Terapi Anak Berkebutuhan Khusus — Palembang Dempo
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-5 font-heading text-[2rem] font-black leading-[1.1] tracking-tight text-yamet-ink sm:text-5xl lg:text-6xl"
                data-testid="hero-headline"
            >
                Bantu si kecil mencapai
                <span className="relative inline-block px-2">
                    <span className="relative z-10 text-yamet-brick">potensi terbaiknya</span>
                    <svg
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-1 -z-0 w-full"
                        viewBox="0 0 300 18"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M2 14 C 80 4, 220 4, 298 14"
                            stroke="#F4C20D"
                            strokeWidth="6"
                            strokeLinecap="round"
                            fill="none"
                        />
                    </svg>
                </span>{" "}
                lewat intervensi dini.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-6 max-w-xl text-base leading-relaxed text-yamet-ink-muted sm:text-lg"
                data-testid="hero-subheadline"
            >
                Terapi wicara, sensori integrasi, okupasi, perilaku, pedagogik, dan
                fisioterapi — programnya disusun satu per satu untuk tiap anak dan
                didampingi tim terapis berpengalaman — sejak tahun 2023 di Palembang.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
                <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="hero-cta-whatsapp"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-yamet-brick px-7 py-4 text-base font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-yamet-brick-dark hover:shadow-xl active:translate-y-0 active:scale-[0.98]"
                >
                    <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-[-6deg]" />
                    Konsultasi via WhatsApp
                </a>
                <a
                    href="#tumbuh-kembang"
                    data-testid="hero-cta-timeline"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-yamet-gold/30 bg-white/70 px-7 py-3.5 text-base font-bold text-yamet-brick shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-yamet-brick hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                >
                    <ArrowDownCircle className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                    Lihat Tahap Tumbuh Kembang
                </a>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.08, delayChildren: 0.4 },
                    },
                }}
                className="mt-10 flex flex-wrap gap-3"
                data-testid="hero-trust-badges"
            >
                {trustBadges.map((b) => (
                    <motion.li
                        key={b.label}
                        variants={{
                            hidden: { opacity: 0, y: 12 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="flex items-center gap-2 rounded-full border border-yamet-gold/15 bg-white/80 px-4 py-2 text-xs font-semibold text-yamet-ink shadow-sm backdrop-blur sm:text-sm"
                    >
                        <b.icon className="h-4 w-4 text-yamet-brick" />
                        {b.label}
                    </motion.li>
                ))}
            </motion.ul>
        </>
    );
}

export default function Hero() {
    const [is3d, setIs3d] = useState(false);

    useEffect(() => {
        const update = () => setIs3d(canRender3D());
        update();
        const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
        m?.addEventListener?.("change", update);
        window.addEventListener("resize", update);
        return () => {
            m?.removeEventListener?.("change", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    if (is3d) {
        // 3D mode: sensory-integration room as the background layer, copy frontmost.
        return (
            <section
                id="hero"
                data-testid="hero-section"
                className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-16 lg:pt-32 lg:pb-20"
            >
                <Suspense fallback={null}>
                    <SensoryRoom3D />
                </Suspense>

                {/* legibility scrims */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yamet-cream via-yamet-cream/80 to-transparent"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-yamet-cream to-transparent"
                />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 lg:px-8">
                    <div className="max-w-2xl">
                        <HeroCopy />
                    </div>
                </div>
            </section>
        );
    }

    // Fallback: classic two-column hero (mobile / reduced-motion / no-WebGL).
    return (
        <section
            id="hero"
            data-testid="hero-section"
            className="relative overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24"
        >
            {/* Decorative background blobs */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-yamet-gold/15 blur-3xl" />
                <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-yamet-peach/30 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-yamet-sun-50 blur-3xl" />
                <div className="absolute inset-0 grain-bg opacity-50" />
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 lg:grid-cols-12 lg:gap-10 lg:px-8">
                {/* Left: text */}
                <div className="lg:col-span-7">
                    <HeroCopy />
                </div>

                {/* Right: image with floating accents */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative lg:col-span-5"
                    data-testid="hero-visual"
                >
                    {/* HP: ilustrasi lebih kecil & lebih pendek supaya tidak menghabiskan satu layar penuh */}
                    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:aspect-[4/5] sm:max-w-md">
                        {/* Offset accent panels */}
                        <div aria-hidden="true" className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-4xl bg-yamet-peach/50" />
                        <div aria-hidden="true" className="absolute -top-5 -left-5 -z-10 h-28 w-28 rounded-4xl bg-yamet-sun-50" />

                        <div className="relative flex h-full w-full items-end justify-center overflow-hidden rounded-4xl bg-gradient-to-b from-yamet-sun-50 via-yamet-cream to-yamet-peach-50 shadow-glow ring-1 ring-yamet-ink/5">
                            <div aria-hidden="true" className="absolute left-6 top-8 h-8 w-8 rounded-full bg-yamet-peach/80" />
                            <div aria-hidden="true" className="absolute right-8 top-14 h-5 w-5 rounded-full bg-yamet-gold/40" />
                            <div aria-hidden="true" className="absolute right-12 bottom-28 h-6 w-6 rounded-full bg-yamet-sun-100" />
                            <img
                                src="/u-4-tahun.webp"
                                alt="Ilustrasi anak tersenyum berdiri di ruang terapi"
                                className="relative z-10 h-[97%] w-auto object-contain drop-shadow-2xl"
                                loading="eager"
                            />
                        </div>

                        {/* Floating chip 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, rotate: -6 }}
                            animate={{ opacity: 1, y: 0, rotate: -6 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="absolute -left-4 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-glow ring-1 ring-yamet-gold/10"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yamet-sun-50">
                                <HeartHandshake className="h-5 w-5 text-yamet-gold" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-yamet-ink-muted">
                                    Program
                                </div>
                                <div className="text-sm font-bold text-yamet-ink">Individual</div>
                            </div>
                        </motion.div>

                        {/* Floating chip 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20, rotate: 4 }}
                            animate={{ opacity: 1, y: 0, rotate: 4 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                            className="absolute -right-2 bottom-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-glow ring-1 ring-yamet-peach/40"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yamet-peach/40">
                                <CalendarCheck className="h-5 w-5 text-yamet-orange" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-yamet-ink-muted">
                                    Intervensi
                                </div>
                                <div className="text-sm font-bold text-yamet-ink">Dini & Terstruktur</div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
