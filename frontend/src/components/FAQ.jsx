import React from "react";
import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";

const FAQS = [
    {
        q: "Usia berapa anak sudah bisa mulai terapi?",
        a: "YAMET melayani anak dari usia 0 hingga 15 tahun. Terapi dapat dimulai sejak dini — bahkan untuk bayi yang terdeteksi mengalami keterlambatan perkembangan. Semakin dini intervensi dilakukan, semakin optimal hasilnya bagi tumbuh kembang si kecil.",
    },
    {
        q: "Berapa durasi dan frekuensi sesi terapinya?",
        a: "Setiap sesi berlangsung 60 menit — terdiri dari 50 menit terapi bersama anak dan 10 menit laporan kepada orang tua, sehingga Anda selalu memahami perkembangan serta aktivitas yang dilakukan si kecil. Frekuensi sesi ditentukan berdasarkan kebutuhan anak setelah observasi & asesmen awal.",
    },
    {
        q: "Apakah perlu rujukan dari dokter?",
        a: "Tidak wajib. Anda dapat langsung datang untuk konsultasi awal. Namun, jika sudah memiliki hasil pemeriksaan dokter spesialis anak atau psikiater, kami akan dengan senang hati menjadikannya sebagai referensi tambahan untuk mendukung program terapi anak.",
    },
    {
        q: "Bagaimana cara mendaftar?",
        a: "Cukup hubungi WhatsApp kami untuk konsultasi. Tim YAMET akan membantu menjadwalkan observasi & asesmen awal sesuai ketersediaan Anda, lalu menjelaskan langkah-langkah selanjutnya dengan ramah dan jelas.",
    },
    {
        q: "Berapa estimasi biaya dan paketnya?",
        a: "Biaya disesuaikan dengan jenis terapi yang dibutuhkan dan jumlah sesi per bulan, sehingga fleksibel mengikuti kebutuhan dan kondisi setiap anak. Untuk informasi paket dan biaya terbaru, silakan hubungi kami via WhatsApp — tim YAMET akan dengan senang hati membantu.",
    },
];

export default function FAQ() {
    return (
        <section
            id="faq"
            data-testid="faq-section"
            className="relative bg-yamet-sun-50/30 py-12 sm:py-16 lg:py-24"
        >
            <div className="mx-auto max-w-4xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-yamet-gold/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-brick shadow-sm">
                        Pertanyaan umum
                    </div>
                    <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                        Hal yang sering{" "}
                        <span className="text-yamet-gold">ditanyakan orang tua.</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-10"
                >
                    <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                        {FAQS.map((f, i) => (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className="border-b border-yamet-gold/15"
                                data-testid={`faq-item-${i}`}
                            >
                                <AccordionTrigger
                                    data-testid={`faq-trigger-${i}`}
                                    className="py-5 text-left font-heading text-base font-extrabold text-yamet-ink transition-colors hover:text-yamet-brick hover:no-underline sm:text-lg"
                                >
                                    {f.q}
                                </AccordionTrigger>
                                <AccordionContent
                                    data-testid={`faq-content-${i}`}
                                    className="max-w-2xl pb-5 text-sm leading-relaxed text-yamet-ink-muted sm:text-base"
                                >
                                    {f.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
