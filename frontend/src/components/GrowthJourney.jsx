import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Hand, MessageSquare, Heart, Baby, Info, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { GROWTH_STAGES, STIMULASI } from "../data/growth";
import { waLink } from "../data/site";

const CAT_META = {
    gerakKasar: { icon: Activity, cls: "bg-yamet-gold/10 text-yamet-gold" },
    gerakHalus: { icon: Hand, cls: "bg-yamet-peach/30 text-yamet-orange" },
    komunikasi: { icon: MessageSquare, cls: "bg-yamet-gold/10 text-yamet-gold" },
    sosial: { icon: Heart, cls: "bg-yamet-peach/20 text-yamet-orange" },
};

const N = GROWTH_STAGES.length;

/* Remove the (near-uniform light) studio background in-browser via canvas
   flood-fill from the edges. Returns a transparent-PNG data URL, or the
   original URL on any failure (CORS taint, load error, etc.). */
function cutout(url, frac = 0.8) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onerror = () => resolve(url);
        img.onload = () => {
            try {
                const maxW = 540;
                const sc = Math.min(1, maxW / img.naturalWidth);
                const w = Math.round(img.naturalWidth * sc);
                const h = Math.round(img.naturalHeight * sc);
                const work = document.createElement("canvas");
                work.width = w; work.height = h;
                const wx = work.getContext("2d", { willReadFrequently: true });
                wx.drawImage(img, 0, 0, w, h);
                const id = wx.getImageData(0, 0, w, h);
                const a = id.data;
                const corners = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
                let br = 0, bgc = 0, bb = 0;
                for (const [x, y] of corners) { const i = (y * w + x) * 4; br += a[i]; bgc += a[i + 1]; bb += a[i + 2]; }
                br /= 4; bgc /= 4; bb /= 4;
                const cornerA = (a[3] + a[(w - 1) * 4 + 3] + a[((h - 1) * w) * 4 + 3] + a[((h - 1) * w + w - 1) * 4 + 3]) / 4;
                const transparentInput = cornerA < 250; // already-cut PNG -> skip color removal
                const bgLum = (br + bgc + bb) / 3;
                const tol = bgLum < 60 ? 46 : 72, t2 = tol * tol; // gentler on dark bg so hair survives
                const isBg = (i) => {
                    const r = a[i], g = a[i + 1], b = a[i + 2];
                    if (Math.max(r, g, b) - Math.min(r, g, b) > 22) return false; // keep warm/colorful (skin, clothes)
                    const dr = r - br, dg = g - bgc, db = b - bb;
                    return dr * dr + dg * dg + db * db <= t2;
                };
                if (!transparentInput) {
                    const seen = new Uint8Array(w * h);
                    const stack = [];
                    for (let x = 0; x < w; x++) { stack.push(x, 0, x, h - 1); }
                    for (let y = 0; y < h; y++) { stack.push(0, y, w - 1, y); }
                    while (stack.length) {
                        const y = stack.pop(), x = stack.pop();
                        if (x < 0 || y < 0 || x >= w || y >= h) continue;
                        const p = y * w + x;
                        if (seen[p]) continue;
                        const i = p * 4;
                        if (!isBg(i)) continue;
                        seen[p] = 1; a[i + 3] = 0;
                        stack.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
                    }
                }
                // keep only the largest connected blob (removes stray artifacts/wisps)
                {
                    const comp = new Int32Array(w * h).fill(-1);
                    let best = -1, bestSize = 0, cid = 0;
                    const q = [];
                    for (let p0 = 0; p0 < w * h; p0++) {
                        if (comp[p0] !== -1 || a[p0 * 4 + 3] <= 40) continue;
                        comp[p0] = cid; q.length = 0; q.push(p0); let size = 0;
                        while (q.length) {
                            const p = q.pop(); size++;
                            const x = p % w, y = (p / w) | 0;
                            if (x > 0 && comp[p - 1] === -1 && a[(p - 1) * 4 + 3] > 40) { comp[p - 1] = cid; q.push(p - 1); }
                            if (x < w - 1 && comp[p + 1] === -1 && a[(p + 1) * 4 + 3] > 40) { comp[p + 1] = cid; q.push(p + 1); }
                            if (y > 0 && comp[p - w] === -1 && a[(p - w) * 4 + 3] > 40) { comp[p - w] = cid; q.push(p - w); }
                            if (y < h - 1 && comp[p + w] === -1 && a[(p + w) * 4 + 3] > 40) { comp[p + w] = cid; q.push(p + w); }
                        }
                        if (size > bestSize) { bestSize = size; best = cid; }
                        cid++;
                    }
                    for (let p = 0; p < w * h; p++) { if (comp[p] !== best) a[p * 4 + 3] = 0; }
                }
                // density-based bounds: ignore thin stray wisps/specks
                const rowFill = new Int32Array(h), colFill = new Int32Array(w);
                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        if (a[(y * w + x) * 4 + 3] > 40) { rowFill[y]++; colFill[x]++; }
                    }
                }
                const minRow = Math.max(4, Math.round(w * 0.015));
                const minCol = Math.max(4, Math.round(h * 0.01));
                let minX = -1, maxX = -1, minY = -1, maxY = -1;
                for (let y = 0; y < h; y++) { if (rowFill[y] >= minRow) { if (minY < 0) minY = y; maxY = y; } }
                for (let x = 0; x < w; x++) { if (colFill[x] >= minCol) { if (minX < 0) minX = x; maxX = x; } }
                if (maxX < 0 || maxY < 0) { resolve(url); return; }
                wx.putImageData(id, 0, 0);
                const bw = maxX - minX + 1, bh = maxY - minY + 1;
                const OW = 600, OH = 800;
                const out = document.createElement("canvas");
                out.width = OW; out.height = OH;
                const ox = out.getContext("2d");
                // Uniform sizing: fit every figure into the SAME box (contain,
                // bottom-aligned) so all ages look consistent — no per-stage scaling.
                const frameH = OH * 0.88, frameW = OW * 0.94;
                const s2 = Math.min(frameH / bh, frameW / bw);
                const figH = bh * s2, figW = bw * s2;
                const dx = (OW - figW) / 2, dy = OH - figH - OH * 0.06;
                ox.drawImage(work, minX, minY, bw, bh, dx, dy, figW, figH);
                resolve(out.toDataURL("image/png"));
            } catch (e) {
                resolve(url);
            }
        };
        img.src = url; // gambar lokal: cukup satu unduhan, cache dipakai bersama <img>
    });
}

function useCutouts() {
    const [cut, setCut] = useState({});
    useEffect(() => {
        let alive = true;
        (async () => {
            for (const s of GROWTH_STAGES) {
                const d = await cutout(s.image);
                if (!alive) return;
                setCut((prev) => ({ ...prev, [s.id]: d }));
            }
        })();
        return () => { alive = false; };
    }, []);
    return cut;
}

function Categories({ stage }) {
    return (
        <ul className="grid grid-cols-2 gap-3">
            {stage.cats.map((cat) => {
                const meta = CAT_META[cat.key];
                const Icon = meta.icon;
                return (
                    <li key={cat.key} className="rounded-2xl bg-white/80 p-3.5 ring-1 ring-yamet-gold/10 shadow-soft backdrop-blur-sm">
                        <div className="mb-1.5 flex items-center gap-2">
                            <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${meta.cls}`}>
                                <Icon className="h-3.5 w-3.5" />
                            </span>
                            <h4 className="font-heading text-[13px] font-extrabold text-yamet-ink">{cat.title}</h4>
                        </div>
                        <ul className="space-y-1 text-[12.5px] leading-snug text-yamet-ink-muted">
                            {cat.points.map((p, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yamet-gold" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

function Stimulasi({ stage }) {
    const tips = STIMULASI[stage.id] || [];
    if (!tips.length) return null;
    return (
        <div className="rounded-2xl bg-white p-4 ring-1 ring-yamet-peach/40 shadow-soft">
            <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-yamet-peach/30 text-yamet-orange">
                    <Sparkles className="h-3.5 w-3.5" />
                </span>
                <h4 className="font-heading text-[13px] font-extrabold text-yamet-ink">Stimulasi Ayah &amp; Bunda</h4>
            </div>
            <ul className="space-y-1.5 text-[12.5px] leading-snug text-yamet-ink-muted">
                {tips.map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-yamet-orange" />
                        <span>{t}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Heading() {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-yamet-gold/15 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-brick shadow-sm backdrop-blur">
                <Baby className="h-3.5 w-3.5" />
                Perjalanan 0–5 tahun
            </div>
            <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                Lihat si Kecil{" "}
                <span className="relative inline-block">
                    <span className="relative z-10 text-yamet-brick">tumbuh &amp; berkembang</span>
                    <span className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-brand-yellow/60" />
                </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                Gulir perlahan dan lihat tahap demi tahap tumbuh kembang anak, dari bayi hingga usia 5 tahun. Panduan ini gambaran umum, bukan diagnosis. Anak dalam ilustrasi bukan anak sungguhan.
            </p>
        </motion.div>
    );
}

function MedicalNote() {
    return (
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto mt-12 max-w-3xl rounded-3xl bg-yamet-sun-50/60 p-6 text-sm leading-relaxed text-yamet-ink-muted ring-1 ring-yamet-gold/15 sm:p-8 sm:text-base">
            <div className="mb-2 flex items-center gap-2 font-bold text-yamet-gold">
                <Info className="h-5 w-5" />
                Catatan untuk orang tua
            </div>
            Tahapan di atas adalah <strong>panduan edukatif</strong> (diadaptasi dari Denver II), bukan diagnosis. Setiap anak berkembang dengan kecepatan berbeda. Bila ada kekhawatiran,{" "}
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="-my-3 inline-block py-3 font-bold text-yamet-gold underline-offset-2 hover:underline">konsultasi bersama tim YAMET</a>.
        </motion.div>
    );
}

function PinnedJourney({ cut }) {
    const wrapRef = useRef(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        let raf = 0;
        const onScroll = () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = 0;
                const rect = wrap.getBoundingClientRect();
                const total = rect.height - window.innerHeight;
                const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
                setActive(Math.min(N - 1, Math.round(p * (N - 1))));
            });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
    }, []);

    const goTo = (i) => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const top = window.scrollY + wrap.getBoundingClientRect().top;
        const dest = top + (i / (N - 1)) * (wrap.offsetHeight - window.innerHeight);
        window.scrollTo({ top: dest, behavior: "smooth" });
    };

    const stage = GROWTH_STAGES[active];

    return (
        <div ref={wrapRef} className="relative mt-8 hidden lg:block" style={{ height: `${N * 56}vh` }}>
            <div className="sticky top-0 flex h-dvh items-center">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-6 px-8">
                    <div className="col-span-4">
                        <motion.div key={stage.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                            <div className={`mb-3 inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${stage.accent === "peach" ? "bg-yamet-peach/30 text-yamet-orange" : "bg-yamet-gold/10 text-yamet-gold"}`}>
                                Tahap {active + 1} dari {N}
                            </div>
                            <h3 className="font-heading text-4xl font-extrabold leading-none text-yamet-ink xl:text-5xl">{stage.ageLabel}</h3>
                            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-yamet-ink-muted">{stage.intro}</p>
                            <div className="mt-5"><Categories stage={stage} /></div>
                        </motion.div>
                    </div>

                    <div className="col-span-4">
                        <div className="relative mx-auto aspect-[3/4] w-full max-w-[440px]">
                            <div aria-hidden="true" className={`absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700 ${stage.accent === "peach" ? "bg-yamet-peach/25" : "bg-yamet-gold/15"}`} />
                            <div className="pointer-events-none absolute inset-x-0 top-2 -z-0 text-center font-heading text-[120px] font-extrabold leading-none text-yamet-gold/5">{active + 1}</div>
                            {GROWTH_STAGES.map((s, i) => (
                                <img
                                    key={s.id}
                                    src={cut[s.id] || s.image}
                                    alt={i === active ? `Ilustrasi anak usia ${s.ageLabel}` : ""}
                                    aria-hidden={i !== active}
                                    loading="lazy"
                                    className="absolute inset-0 z-10 h-full w-full object-contain object-bottom transition-opacity duration-300 ease-out"
                                    style={{ opacity: i === active ? 1 : 0 }}
                                    draggable="false"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-4">
                        <motion.div key={stage.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                            <Stimulasi stage={stage} />
                        </motion.div>
                        <div className="mt-5 flex flex-col gap-1.5 border-l border-yamet-gold/15 pl-4">
                            {GROWTH_STAGES.map((s, i) => (
                                <button key={s.id} type="button" onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined} className={`group flex items-center gap-2 py-1.5 text-left text-xs transition-colors ${i === active ? "font-extrabold text-yamet-brick" : "font-medium text-yamet-ink-muted hover:text-yamet-ink"}`}>
                                    <span className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-yamet-gold" : "w-2 bg-yamet-gold/25 group-hover:w-3"}`} />
                                    {s.ageShort}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SWIPE_MIN_PX = 48;

/* HP & tablet: satu tahap per layar (bukan 12 tahap ditumpuk ±12.000 px).
   Pindah tahap lewat deretan usia yang bisa digulir mendatar, tombol
   sebelum/berikutnya (44 px), atau geser pada ilustrasi. */
function StepJourney({ show, cut }) {
    const [active, setActive] = useState(0);
    const touchStart = useRef(null);
    const chipRefs = useRef([]);
    const s = GROWTH_STAGES[active];
    const go = (step) => setActive((i) => Math.min(N - 1, Math.max(0, i + step)));

    // deretan usia ikut bergulir supaya tahap aktif selalu terlihat
    useEffect(() => {
        chipRefs.current[active]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, [active]);

    const onTouchStart = (e) => {
        touchStart.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    };
    const onTouchEnd = (e) => {
        const st = touchStart.current;
        touchStart.current = null;
        if (!st || e.touches.length > 0) return;
        const dx = e.changedTouches[0].clientX - st.x;
        const dy = e.changedTouches[0].clientY - st.y;
        if (Math.abs(dx) >= SWIPE_MIN_PX && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    };

    return (
        <div className={`mt-8 ${show}`} data-testid="journey-steps">
            {/* deretan usia */}
            <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Pilih tahap usia">
                <div className="flex w-max gap-2 pb-1">
                    {GROWTH_STAGES.map((st, i) => (
                        <button
                            key={st.id}
                            ref={(el) => { chipRefs.current[i] = el; }}
                            type="button"
                            role="tab"
                            aria-selected={i === active}
                            onClick={() => setActive(i)}
                            className={`min-h-[44px] shrink-0 rounded-full px-4 text-sm font-bold transition-colors ${
                                i === active ? "bg-yamet-brick text-white shadow-soft" : "bg-white text-yamet-ink-muted ring-1 ring-yamet-gold/15 hover:text-yamet-ink"
                            }`}
                        >
                            {st.ageShort}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-12 sm:gap-6" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                <div className="relative mx-auto flex h-64 w-full max-w-[240px] items-end justify-center sm:col-span-5 sm:h-80 sm:max-w-[300px]">
                    <div aria-hidden="true" className={`absolute left-1/2 top-1/2 h-[55%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl ${s.accent === "peach" ? "bg-yamet-peach/25" : "bg-yamet-gold/15"}`} />
                    {GROWTH_STAGES.map((st, i) => (
                        <img
                            key={st.id}
                            src={cut[st.id] || st.image}
                            alt={i === active ? `Ilustrasi anak usia ${st.ageLabel}` : ""}
                            aria-hidden={i !== active}
                            loading="lazy"
                            className={`absolute inset-0 z-10 h-full w-full object-contain object-bottom transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
                            draggable="false"
                        />
                    ))}
                </div>

                <div className="sm:col-span-7" aria-live="polite">
                    <div className={`inline-flex rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${s.accent === "peach" ? "bg-yamet-peach/30 text-yamet-orange" : "bg-yamet-gold/10 text-yamet-gold"}`}>
                        Tahap {active + 1} dari {N}
                    </div>
                    <h3 className="mt-2 font-heading text-2xl font-extrabold text-yamet-ink sm:text-3xl">{s.ageLabel}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-yamet-ink-muted">{s.intro}</p>
                    <div className="mt-4"><Categories stage={s} /></div>
                    <div className="mt-4"><Stimulasi stage={s} /></div>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={active === 0}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-yamet-gold/20 bg-white px-4 text-sm font-bold text-yamet-brick transition-all hover:border-yamet-brick active:scale-[0.98] disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Sebelumnya
                </button>
                <span className="text-center text-[11px] font-semibold leading-tight text-yamet-ink-muted">geser untuk pindah</span>
                <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={active === N - 1}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-yamet-gold/20 bg-white px-4 text-sm font-bold text-yamet-brick transition-all hover:border-yamet-brick active:scale-[0.98] disabled:opacity-40"
                >
                    Berikutnya
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

export default function GrowthJourney() {
    const [reduced, setReduced] = useState(false);
    const cut = useCutouts();

    useEffect(() => {
        const m = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(m.matches);
        const h = (e) => setReduced(e.matches);
        m.addEventListener?.("change", h);
        return () => m.removeEventListener?.("change", h);
    }, []);

    return (
        <section id="tumbuh-kembang" className="relative py-14 sm:py-20 lg:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yamet-peach/15 blur-3xl" />
                <div className="absolute -right-16 top-1/2 h-64 w-64 rounded-full bg-yamet-sun-50 blur-3xl" />
            </div>

            <div className="mx-auto max-w-6xl px-5 lg:px-8">
                <Heading />
            </div>

            {!reduced && <PinnedJourney cut={cut} />}

            <div className="mx-auto max-w-6xl px-5 lg:px-8">
                <StepJourney show={reduced ? "block" : "lg:hidden"} cut={cut} />
                <MedicalNote />
            </div>
        </section>
    );
}
