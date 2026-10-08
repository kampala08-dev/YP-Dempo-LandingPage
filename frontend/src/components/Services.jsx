import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Activity, HandHelping, Blocks, Star, BookOpen, Check, ArrowUpRight } from "lucide-react";
import { waLink } from "../data/site";

// Daftar layanan terapi resmi YAMET Dempo (dari pemilik klinik, 8 Okt 2026).
// "points" = fokus tiap terapi, ditampilkan sebagai daftar bercentang di kartu.
const SERVICES = [
    {
        id: "wicara", n: "01", icon: MessageSquare, title: "Terapi Wicara", color: "red",
        points: ["Pemahaman / ekspresi bahasa", "Artikulasi", "Pragmatik", "Oral motor training"],
    },
    {
        id: "sensori", n: "02", icon: Blocks, title: "Terapi Sensori Integrasi", color: "blue",
        points: ["Regulasi sensori", "Fokus / atensi", "Sensory play"],
    },
    {
        id: "okupasi", n: "03", icon: HandHelping, title: "Terapi Okupasi", color: "yellow",
        points: ["Motorik halus / kasar", "Kemandirian atau ADL (makan, menulis, berpakaian)"],
    },
    {
        id: "perilaku", n: "04", icon: Star, title: "Terapi Perilaku", color: "green",
        points: ["Manajemen perilaku", "Kepatuhan instruksi", "Pretend play", "Keterampilan sosial"],
    },
    {
        id: "pedagogik", n: "05", icon: BookOpen, title: "Terapi Pedagogik", color: "red",
        points: ["Remedial", "Literasi / numerasi", "Strategi belajar", "Fungsi eksekutif"],
    },
    {
        id: "fisioterapi", n: "06", icon: Activity, title: "Fisioterapi", color: "blue",
        points: ["Kekuatan & kontrol otot", "Postur", "Keseimbangan & koordinasi"],
    },
];

const C = {
    blue: { icon: "bg-brand-blue text-white", num: "text-brand-blue/10", link: "text-brand-blue", hover: "hover:border-brand-blue/40", check: "text-brand-blue" },
    green: { icon: "bg-brand-green text-white", num: "text-brand-green/10", link: "text-brand-green", hover: "hover:border-brand-green/40", check: "text-brand-green" },
    red: { icon: "bg-brand-red text-white", num: "text-brand-red/10", link: "text-brand-red", hover: "hover:border-brand-red/40", check: "text-brand-red" },
    yellow: { icon: "bg-brand-yellow text-yamet-ink", num: "text-brand-yellow/25", link: "text-yamet-ink", hover: "hover:border-brand-yellow/50", check: "text-yamet-teal" },
};

export default function Services() {
    return (
        <section id="layanan" data-testid="services-section" className="relative py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal shadow-sm">
                            Layanan Kami
                        </div>
                        <h2 className="mt-6 font-heading text-4xl font-black leading-[1.05] tracking-tight text-yamet-ink sm:text-5xl lg:text-6xl">
                            Layanan Terapi
                            <span className="block text-yamet-teal">untuk si kecil.</span>
                        </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5 lg:pb-2">
                        <p className="text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                            Rangkaian layanan terapi YAMET yang bekerja bersama untuk mendukung perkembangan si kecil secara utuh — disusun individual sesuai kebutuhan tiap anak.
                        </p>
                        <a href={waLink("Halo YAMET, saya ingin konsultasi soal tumbuh kembang anak.")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-yamet-teal px-5 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:gap-3 hover:bg-yamet-ink">
                            Konsultasi
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </motion.div>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {SERVICES.map((s, i) => {
                        const Icon = s.icon;
                        const c = C[s.color];
                        return (
                            <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }} data-testid={`service-card-${s.id}`} className={`group relative flex flex-col rounded-2xl border border-yamet-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-soft ${c.hover}`}>
                                <span className={`pointer-events-none absolute right-5 top-3 font-heading text-5xl font-black leading-none ${c.num}`}>{s.n}</span>
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.icon}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="mt-5 font-heading text-lg font-extrabold text-yamet-ink">{s.title}</h3>
                                <ul className="mt-3 flex-1 space-y-2">
                                    {s.points.map((pt) => (
                                        <li key={pt} className="flex items-start gap-2 text-sm leading-relaxed text-yamet-ink-muted">
                                            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${c.check}`} strokeWidth={3} aria-hidden="true" />
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href={waLink(`Halo YAMET, saya ingin tahu lebih lanjut soal ${s.title}.`)} target="_blank" rel="noopener noreferrer" data-testid={`service-card-${s.id}-link`} className={`mt-6 inline-flex items-center gap-1.5 border-t border-yamet-ink/10 pt-4 text-sm font-bold ${c.link} transition-all duration-300 group-hover:gap-2.5`}>
                                    Selengkapnya
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
