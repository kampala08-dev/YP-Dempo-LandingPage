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
        desc: "Anak sulit memusatkan perhatian, mudah teralihkan, atau menunjukkan emosi yang sulit dikendalikan. Terapi perilaku dan pedagogik membantunya menjadi lebih fokus, tenang, dan adaptif.",
    },
];

// Aksen bergantian teal/peach (bukan pelangi) — konsisten dengan kartu layanan.
const DOT = ["bg-yamet-brick", "bg-yamet-peach"];

export default function Conditions() {
    return (
        <section id="kondisi" data-testid="conditions-section" className="relative py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-7">
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-yamet-brick before:h-px before:w-8 before:bg-yamet-brick">
                            Kondisi yang kami tangani
                        </div>
                        <h2 className="mt-6 font-heading text-4xl font-black leading-[1.05] tracking-tight text-yamet-ink sm:text-5xl lg:text-6xl">
                            Kami hadir untuk{" "}
                            <span className="text-yamet-gold">setiap perjalanan</span> tumbuh kembang.
                        </h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5 lg:pb-2">
                        <p className="text-base leading-relaxed text-yamet-ink-muted sm:text-lg">
                            Bila Anda mengenali salah satu hal berikut pada si kecil, jangan ragu untuk bertanya — kami siap mendengarkan.
                        </p>
                    </motion.div>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-y-10">
                    {CONDITIONS.map((c, i) => (
                        <motion.div key={c.title} initial={{ opacity: 0, scale: 0.97, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.05 }} data-testid={`condition-${i}`} className="group border-l-2 border-yamet-gold/20 pl-5 transition-colors duration-300 hover:border-yamet-brick">
                            <div className="flex items-start gap-2.5">
                                <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${DOT[i % DOT.length]}`} aria-hidden="true" />
                                <h3 className="font-heading text-lg font-extrabold leading-snug text-yamet-ink">{c.title}</h3>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-yamet-ink-muted">{c.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
