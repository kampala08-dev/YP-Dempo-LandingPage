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
        desc: "Asesmen mendalam oleh terapis & psikolog sebagai dasar penyusunan program.",
    },
    {
        n: "03",
        icon: FileText,
        title: "Program individual",
        desc: "Program terapi disusun khusus berdasarkan hasil asesmen — bukan satu solusi untuk semua.",
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
        desc: "Update berkala untuk orang tua — transparan, terukur, dan komunikatif.",
    },
];

export default function Workflow() {
    return (
        <section
            id="alur"
            data-testid="workflow-section"
            className="relative bg-gradient-to-b from-yamet-teal-50/30 to-transparent py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal-600 shadow-sm">
                        Alur Layanan
                    </div>
                    <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                        Lima langkah,{" "}
                        <span className="text-yamet-teal">satu tujuan</span>.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                        Proses sederhana yang dirancang agar Anda dan si kecil merasa didampingi
                        dari awal hingga progres terlihat.
                    </p>
                </motion.div>

                <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
                    {/* Connecting line (desktop) */}
                    <div className="absolute left-0 right-0 top-14 hidden h-0.5 lg:block" aria-hidden="true">
                        <div className="mx-12 h-full rounded-full border-t-2 border-dashed border-yamet-teal/30" />
                    </div>

                    {STEPS.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.n}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.55, delay: i * 0.1 }}
                                data-testid={`workflow-step-${i + 1}`}
                                className="relative rounded-2xl border border-yamet-ink/10 bg-white p-6 transition-colors duration-300 hover:border-yamet-teal/40"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-yamet-teal text-white">
                                        <Icon className="h-6 w-6" />
                                        <div className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-yamet-peach text-[10px] font-extrabold text-yamet-ink ring-2 ring-white">
                                            {s.n}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="mt-5 font-heading text-base font-extrabold text-yamet-ink sm:text-lg">
                                    {s.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-yamet-ink-muted">
                                    {s.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
