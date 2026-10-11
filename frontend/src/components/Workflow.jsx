import React from "react";
import { motion } from "framer-motion";
import { Eye, ClipboardCheck, FileText, HeartHandshake, LineChart } from "lucide-react";

const STEPS = [
    {
        n: "01",
        icon: Eye,
        title: "Observasi anak",
        desc: "Anak diobservasi langsung oleh tim terapis untuk memahami kondisi dan kebutuhannya.",
    },
    {
        n: "02",
        icon: ClipboardCheck,
        title: "Asesmen awal",
        desc: "Asesmen mendalam oleh tim terapis sebagai dasar penyusunan program.",
    },
    {
        n: "03",
        icon: FileText,
        title: "Program individual",
        desc: "Program terapi disusun khusus berdasarkan hasil asesmen — bukan satu program untuk semua anak.",
    },
    {
        n: "04",
        icon: HeartHandshake,
        title: "Sesi terapi rutin",
        desc: "Pendampingan rutin yang hangat, terstruktur, dan menyenangkan untuk anak.",
    },
    {
        n: "05",
        icon: LineChart,
        title: "Evaluasi & laporan",
        desc: "Laporan berkala untuk orang tua — apa yang sudah tercapai dan apa langkah berikutnya.",
    },
];

export default function Workflow() {
    return (
        <section id="alur" data-testid="workflow-section" className="relative bg-white py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
                    {/* Kiri: judul + langkah */}
                    <div className="lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-yamet-teal-600 before:h-px before:w-8 before:bg-yamet-teal-600">
                                Alur layanan
                            </div>
                            <h2 className="mt-6 font-heading text-4xl font-black leading-[1.05] tracking-tight text-yamet-ink sm:text-5xl">
                                Lima langkah, <span className="text-yamet-teal-600">satu tujuan</span>.
                            </h2>
                            <p className="mt-4 max-w-md text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                                Proses sederhana supaya Anda dan si kecil merasa didampingi dari awal
                                hingga progres terlihat.
                            </p>
                        </motion.div>

                        <ol className="relative mt-10 space-y-2 border-l-2 border-yamet-teal/15 pl-0">
                            {STEPS.map((s, i) => {
                                const Icon = s.icon;
                                return (
                                    <motion.li
                                        key={s.n}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.45, delay: i * 0.08 }}
                                        data-testid={`workflow-step-${i + 1}`}
                                        className="relative flex gap-5 py-4 pl-8"
                                    >
                                        {/* titik di rel */}
                                        <span
                                            aria-hidden="true"
                                            className="absolute -left-[9px] top-[1.65rem] h-4 w-4 rounded-full border-2 border-white bg-yamet-teal-600 ring-2 ring-yamet-teal/20"
                                        />
                                        <span
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                                                i % 2 ? "bg-yamet-peach/40 text-yamet-orange" : "bg-yamet-teal-50 text-yamet-teal-600"
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-heading text-xs font-extrabold tabular-nums text-yamet-ink-muted">{s.n}</span>
                                                <h3 className="font-heading text-lg font-extrabold text-yamet-ink">{s.title}</h3>
                                            </div>
                                            <p className="mt-1 max-w-md text-sm leading-relaxed text-yamet-ink-muted">{s.desc}</p>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ol>
                    </div>

                    {/* Kanan: foto sesi asli, menempel sambil langkah digulir */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-6"
                    >
                        <div className="relative lg:sticky lg:top-28">
                            <div aria-hidden="true" className="absolute -bottom-5 -right-5 h-full w-full rounded-4xl bg-yamet-peach/40" />
                            <div aria-hidden="true" className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl bg-yamet-teal-50" />
                            <figure className="relative overflow-hidden rounded-4xl shadow-glow ring-1 ring-yamet-ink/5">
                                <img
                                    src="/galeri/dsc00157-800.webp"
                                    srcSet="/galeri/dsc00157-800.webp 800w, /galeri/dsc00157-1800.webp 1800w"
                                    sizes="(min-width: 1024px) 560px, 100vw"
                                    width={7008}
                                    height={4672}
                                    alt="Terapis duduk di samping seorang anak kecil di meja, membantunya memasang jepitan di tepi mangkuk"
                                    loading="lazy"
                                    decoding="async"
                                    className="block h-auto w-full"
                                />
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-yamet-ink/80 to-transparent px-5 pb-4 pt-12 text-sm font-semibold text-white">
                                    Latihan motorik halus di ruang terapi YAMET Dempo
                                </figcaption>
                            </figure>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
