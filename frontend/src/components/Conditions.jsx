import React from "react";
import { motion } from "framer-motion";

const CONDITIONS = [
    {
        title: "Speech delay",
        desc: "Anak belum mengeluarkan kata atau kalimat sesuai usianya — belum mengoceh, kosakata terbatas, atau sulit merangkai kalimat. Terapi wicara membantu memancing kemampuan bicara, bahasa, dan komunikasinya.",
    },
    {
        title: "Autisme / ASD",
        desc: "Kondisi perkembangan yang memengaruhi cara anak berkomunikasi, berinteraksi, dan berperilaku — misalnya kontak mata terbatas, perilaku berulang, atau sensitif terhadap rangsangan. Intervensi dini lewat terapi perilaku dan sensori integrasi sangat membantu.",
    },
    {
        title: "Gangguan artikulasi",
        desc: "Anak kesulitan melafalkan bunyi atau huruf tertentu sehingga ucapannya sulit dimengerti orang lain. Melalui latihan terarah, ia dibimbing mengucapkan bunyi dengan lebih jelas dan percaya diri.",
    },
    {
        title: "Keterlambatan tumbuh kembang",
        desc: "Pencapaian perkembangan — duduk, berjalan, bicara, atau bermain — belum muncul sesuai tahapan usianya. Observasi dan asesmen membantu menemukan area yang perlu lebih dulu distimulasi.",
    },
    {
        title: "Kesulitan motorik",
        desc: "Anak kesulitan pada gerakan besar (berjalan, melompat, keseimbangan) maupun gerakan halus (menggenggam, menulis, menggunting). Fisioterapi dan terapi okupasi melatih kekuatan, koordinasi, serta kemandiriannya.",
    },
    {
        title: "Kesulitan fokus & perilaku",
        desc: "Anak sulit memusatkan perhatian, mudah teralihkan, atau menunjukkan emosi yang sulit dikendalikan. Pendekatan perilaku dan dukungan psikologis membantunya menjadi lebih fokus, tenang, dan adaptif.",
    },
];

// Brand-color accents, cycled across the condition cards.
const DOT = ["bg-brand-red", "bg-brand-yellow", "bg-brand-green", "bg-brand-blue", "bg-yamet-teal", "bg-yamet-peach"];

export default function Conditions() {
    return (
        <section id="kondisi" data-testid="conditions-section" className="relative py-20 sm:py-24 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal shadow-sm">
                            Kondisi yang Kami Tangani
                        </div>
                        <h2 className="mt-6 font-heading text-4xl font-black leading-[1.05] tracking-tight text-yamet-ink sm:text-5xl lg:text-6xl">
                            Kami hadir untuk{" "}
                            <span className="text-yamet-teal">setiap perjalanan</span> tumbuh kembang.
                        </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5 lg:pb-2">
                        <p className="text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                            Bila Anda mengenali salah satu hal berikut pada si kecil, jangan ragu untuk bertanya — kami siap mendengarkan.
                        </p>
                    </motion.div>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                    {CONDITIONS.map((c, i) => (
                        <motion.div key={c.title} initial={{ opacity: 0, scale: 0.97, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.05 }} data-testid={`condition-${i}`} className="group rounded-2xl border border-yamet-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yamet-teal/40 hover:shadow-soft">
                            <div className="flex items-start gap-2.5">
                                <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-transform group-hover:scale-150 ${DOT[i % DOT.length]}`} />
                                <h3 className="font-heading text-base font-extrabold leading-snug text-yamet-ink">{c.title}</h3>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-yamet-ink-muted">{c.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
