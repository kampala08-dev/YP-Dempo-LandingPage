import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, ExternalLink, Pause, Play } from "lucide-react";
import { GOOGLE_REVIEW_URL, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "../data/site";

// Ulasan asli orang tua dari Google Maps (rating 5,0 · 127 ulasan).
// Hanya ulasan bintang 5. Disunting ringkas untuk keterbacaan; makna & nada tetap sesuai aslinya.
const TESTIMONIALS = [
    {
        id: "t1",
        quote:
            "Pelayanan di Yamet sudah sangat baik, baik dari admin maupun para terapisnya. Terima kasih untuk para terapis yang begitu sabar mengajari anak kami.",
        parent: "Sherli Dewi",
    },
    {
        id: "t2",
        quote:
            "Tempatnya nyaman, dilengkapi CCTV dan ruang tunggu ber-sofa. Terapisnya edukatif, penjelasannya detail dan mudah dipahami, adminnya cepat tanggap saat kami butuh informasi. Terima kasih Yamet 🫶🏻",
        parent: "Astari Indah",
    },
    {
        id: "t3",
        quote:
            "Yamet salah satu tempat ikhtiar kami. Alhamdulillah pelayanannya ramah, tempat terapinya lengkap, dan dijelaskan dengan rinci mengenai terapi untuk anak kami. Kami orang tua pun merasa nyaman dan aman 🥰",
        parent: "Isti Meilani",
    },
    {
        id: "t4",
        quote:
            "Klinik Yamet tempat terapi yang baik, pelayanannya baik, admin dan terapisnya sangat ramah. Ruang tunggu orang tuanya nyaman, luas, bersih, dilengkapi CCTV jadi orang tua bisa memantau anak saat terapi.",
        parent: "Bella Julia",
    },
    {
        id: "t5",
        quote:
            "Tempat terapi yang profesional untuk anak. Setelah sekian lama mencoba ke sana-sini, akhirnya ketemu Yamet yang pas untuk perkembangan buah hati saya. Gurunya baik-baik dan sayang dengan anak-anak.",
        parent: "Veriani Halim",
    },
    {
        id: "t6",
        quote:
            "Terapis berpengalaman dan staf yang ramah, dilengkapi fasilitas serta tempat yang aman dan nyaman. Pilihan cocok bagi orang tua yang ingin memberikan perhatian lebih untuk anak tercinta 🧸❤️",
        parent: "Meu Tia",
    },
    {
        id: "t7",
        quote:
            "Tempat terapi anak yang recommended banget — fasilitasnya nyaman, bersih, dan perlengkapannya super lengkap sesuai standar. Dilengkapi CCTV jadi kita bisa melihat anak selama terapi. Good place, good mood buat anak-anak 😍👍🏻",
        parent: "Septiani Wulandary",
    },
    {
        id: "t8",
        quote:
            "Rumah terapi untuk ABK ternyaman di Palembang. Ruang tunggu untuk orang tua besar, full AC, terapisnya care banget sama muridnya. Yang paling utama, setiap ruangan terapi full CCTV jadi kami orang tua tetap bisa memantau ❤️. Sukses untuk Yamet!",
        parent: "Imelda Rohman",
    },
    {
        id: "t9",
        quote:
            "Terima kasih Yamet Palembang, terkhusus dokter & tim yang terlibat. Hampir 1 bulan anak kami terapi di sini, cukup banyak perubahan positif untuk tumbuh kembangnya.",
        parent: "Tri Mulia Franchika",
    },
    {
        id: "t10",
        quote:
            "Makasih, dokter dan perawatnya care banget sama anak saya. Info yang diberikan jelas dan simpel untuk kami. Terima kasih Yamet, semoga ada perkembangan lebih signifikan untuk anak saya.",
        parent: "Fitri Afriyanti",
    },
    {
        id: "t11",
        quote:
            "Tempat terapi ABK yang sangat bagus: bersih, aman, nyaman, terapis dan adminnya sangat ramah. Anak saya tipe yang susah adaptasi di tempat baru, malah sangat suka dan menikmati terapi di Yamet. Kemajuannya pun melesat cepat.",
        parent: "Marlina Nirmala",
    },
    {
        id: "t12",
        quote:
            "Tempat terapi anak ABK yang terpercaya. Ditangani langsung oleh dokter yang handal dan para terapis yang mumpuni. Lokasi strategis di tengah kota, mudah dicari.",
        parent: "Friska Nanda Indriani",
    },
    {
        id: "t13",
        quote:
            "Anak saya terapi di sini dari awal Yamet buka di Palembang sampai sekarang. Alhamdulillah sejauh ini sudah banyak perkembangannya.",
        parent: "Rani Nurdiana",
    },
    {
        id: "t14",
        quote:
            "Tempat terapi anak terbaik. Pelayanan terapisnya ramah dan baik.",
        parent: "Julekak Pekak",
    },
    {
        id: "t15",
        quote:
            "Rekomendasi tempat terapi yang bagus untuk anak di Palembang — melayani terapi SI, ABA, preschool skills, dan lainnya.",
        parent: "Bunda Davi",
    },
];

function Stars({ className = "h-4 w-4" }) {
    return (
        <div className="flex items-center gap-0.5" aria-label="5 dari 5 bintang">
            {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={`${className} fill-yamet-orange text-yamet-orange`} />
            ))}
        </div>
    );
}

export default function Testimonials() {
    const [idx, setIdx] = useState(0);
    const total = TESTIMONIALS.length;

    const [paused, setPaused] = useState(false);
    const [hovering, setHovering] = useState(false);

    // Putar otomatis hanya bila tidak dijeda, tidak sedang disorot/difokus, dan pengguna tidak minta gerak dikurangi
    useEffect(() => {
        if (paused || hovering) return undefined;
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return undefined;
        const t = setInterval(() => setIdx((p) => (p + 1) % total), 7000);
        return () => clearInterval(t);
    }, [total, paused, hovering]);

    const next = () => setIdx((p) => (p + 1) % total);
    const prev = () => setIdx((p) => (p - 1 + total) % total);

    return (
        <section
            id="testimoni"
            data-testid="testimonials-section"
            className="relative py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal-600 shadow-sm">
                        Cerita Orang Tua
                    </div>
                    <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                        Kepercayaan keluarga{" "}
                        <span className="text-yamet-teal">jadi semangat kami.</span>
                    </h2>

                    {/* Google rating badge */}
                    <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="testimonials-google-rating"
                        className="mt-6 inline-flex items-center gap-3 rounded-full border border-yamet-ink/10 bg-white px-5 py-2.5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <span className="font-heading text-2xl font-black text-yamet-ink">{GOOGLE_RATING}</span>
                        <span className="flex flex-col items-start leading-tight">
                            <Stars className="h-3.5 w-3.5" />
                            <span className="mt-0.5 text-xs font-semibold text-yamet-ink-muted">
                                {GOOGLE_REVIEW_COUNT} ulasan di Google
                            </span>
                        </span>
                    </a>
                </motion.div>

                <div
                    className="relative mt-12"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    onFocusCapture={() => setHovering(true)}
                    onBlurCapture={() => setHovering(false)}
                >
                    {/* Semua kutipan ditumpuk di sel grid yang sama: tinggi kartu = kutipan terpanjang, jadi tidak melompat */}
                    <div className="mx-auto grid max-w-3xl">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={t.id}
                                aria-hidden={i !== idx}
                                initial={false}
                                animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : 12 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className={`col-start-1 row-start-1 rounded-[28px] border border-yamet-ink/10 bg-white p-8 shadow-soft sm:p-12 ${i === idx ? "" : "pointer-events-none"}`}
                                data-testid={i === idx ? `testimonial-card-${idx}` : undefined}
                            >
                                <div className="flex items-center justify-between">
                                    <Quote className="h-10 w-10 text-yamet-peach" aria-hidden="true" />
                                    <Stars />
                                </div>
                                <p className="mt-5 font-heading text-xl leading-relaxed text-yamet-ink sm:text-2xl">
                                    “{t.quote}”
                                </p>
                                <div className="mt-8 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yamet-teal-600 font-heading text-base font-extrabold text-white" aria-hidden="true">
                                        {t.parent.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-heading text-base font-extrabold text-yamet-ink">{t.parent}</div>
                                        <div className="text-xs text-yamet-ink-muted">Orang tua · ulasan bintang 5 di Google</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={prev}
                            data-testid="testimonial-prev"
                            aria-label="Testimoni sebelumnya"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-yamet-ink/10 bg-white text-yamet-teal-600 transition-all hover:-translate-y-0.5 hover:border-yamet-teal/40 hover:shadow-soft active:translate-y-0 active:scale-[0.98]"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <div
                            className="min-w-[64px] text-center font-heading text-sm font-bold tabular-nums text-yamet-ink-muted"
                            data-testid="testimonial-counter"
                        >
                            <span className="text-base text-yamet-teal-600">{idx + 1}</span> / {total}
                        </div>
                        <button
                            type="button"
                            onClick={() => setPaused((p) => !p)}
                            aria-pressed={paused}
                            aria-label={paused ? "Putar otomatis" : "Jeda putar otomatis"}
                            data-testid="testimonial-pause"
                            className={`flex h-11 w-11 items-center justify-center rounded-full border border-yamet-ink/10 bg-white text-yamet-teal-600 transition-all hover:border-yamet-teal/40 hover:shadow-soft active:translate-y-0 active:scale-[0.98]`}
                        >
                            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </button>
                        <button
                            type="button"
                            onClick={next}
                            data-testid="testimonial-next"
                            aria-label="Testimoni berikutnya"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-yamet-ink/10 bg-white text-yamet-teal-600 transition-all hover:-translate-y-0.5 hover:border-yamet-teal/40 hover:shadow-soft active:translate-y-0 active:scale-[0.98]"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="testimonials-google-link"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-yamet-teal/30 bg-white px-6 py-3 text-sm font-bold text-yamet-teal-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-yamet-teal-600 hover:shadow-soft active:translate-y-0 active:scale-[0.98]"
                        >
                            Lihat semua {GOOGLE_REVIEW_COUNT} ulasan di Google
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
