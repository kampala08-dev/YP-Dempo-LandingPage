import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Users, ListChecks, FileBarChart, Smile, CalendarCheck } from "lucide-react";

const POINTS = [
    {
        icon: ClipboardList,
        title: "Asesmen menyeluruh & program individual",
        desc: "Setiap anak dimulai dengan observasi & asesmen mendalam — programnya disusun khusus untuk kebutuhannya.",
    },
    {
        icon: Users,
        title: "Tim terapis berpengalaman",
        desc: "Terapis wicara, sensori integrasi, okupasi, perilaku, pedagogik, dan fisioterapi yang terbiasa bekerja dengan anak.",
    },
    {
        icon: ListChecks,
        title: "Metode terstruktur & terukur",
        desc: "Program mengacu pada asesmen awal, dievaluasi berkala, lalu disesuaikan dengan perkembangan anak — dengan cara yang hangat dan lewat permainan.",
    },
    {
        icon: FileBarChart,
        title: "Laporan perkembangan berkala",
        desc: "Orang tua mendapat update jelas tentang progres anak secara berkala — transparan dan terukur.",
    },
    {
        icon: Smile,
        title: "Lingkungan ramah anak",
        desc: "Ruang terapi yang lembut, aman, dan menyenangkan — supaya si kecil betah dan berkembang.",
    },
    {
        icon: CalendarCheck,
        title: "Sejak tahun 2023",
        desc: "Di Jl. Dempo Luar, Palembang — dengan ruang tunggu orang tua yang nyaman dan CCTV di ruang terapi, jadi Anda bisa memantau sesi anak.",
    },
];

export default function WhyYamet() {
    return (
        <section
            id="mengapa-yamet"
            data-testid="why-yamet-section"
            className="relative bg-yamet-sun-50/40 py-20 sm:py-24 lg:py-28"
        >
            <div aria-hidden="true" className="absolute inset-0 grain-bg opacity-40" />
            <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-yamet-brick before:h-px before:w-8 before:bg-yamet-brick">
                            Mengapa YAMET
                        </div>
                        <h2 className="mt-6 font-heading text-4xl font-black leading-[1.05] tracking-tight text-yamet-ink sm:text-5xl lg:text-6xl">
                            Bukan sekadar terapi.
                            <span className="block text-yamet-gold">Pendampingan yang penuh hati.</span>
                        </h2>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                            Kami percaya intervensi dini yang dilakukan dengan sabar, terstruktur,
                            dan hangat akan membuka pintu terbaik untuk masa depan anak Anda.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                        {POINTS.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div
                                    key={p.title}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: i * 0.07 }}
                                    data-testid={`why-point-${i}`}
                                    className="group rounded-2xl border border-yamet-ink/10 bg-white p-5 transition-colors duration-300 hover:border-yamet-gold/40"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yamet-gold text-white transition-transform group-hover:scale-105">
                                            <Icon className="h-6 w-6" />
                                        </span>
                                        <div>
                                            <h3 className="font-heading text-base font-extrabold text-yamet-ink">
                                                {p.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-relaxed text-yamet-ink-muted">
                                                {p.desc}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
