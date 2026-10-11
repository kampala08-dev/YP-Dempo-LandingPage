import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";
import { waLink } from "../data/site";

export default function ClosingCta() {
    return (
        <section
            id="cta-penutup"
            data-testid="closing-cta-section"
            className="relative py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-5xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                    className="relative overflow-hidden rounded-[36px] bg-yamet-teal-600 p-10 text-center text-white shadow-glow sm:p-14 lg:p-16"
                >
                    {/* Decorative blobs */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-12 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-yamet-peach/30 blur-3xl" />
                        <div className="absolute left-8 top-8 h-12 w-12 rounded-full bg-yamet-peach/40 animate-floaty" />
                        <div className="absolute right-12 top-16 h-8 w-8 rounded-full bg-white/15 animate-floaty-slow" />
                    </div>

                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 150 }}
                        className="relative mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"
                    >
                        <Heart className="h-8 w-8 text-yamet-peach" fill="currentColor" aria-hidden="true" />
                    </motion.div>

                    <h2 className="relative font-heading text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                        Mulai perjalanan tumbuh kembang
                        <span className="block text-yamet-peach-50">anak Anda hari ini.</span>
                    </h2>
                    <p className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-white sm:text-lg">
                        Satu pesan WhatsApp untuk percakapan yang bisa mengubah hari-hari si kecil.
                        Tim YAMET siap mendengarkan Anda.
                    </p>

                    <motion.a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="closing-cta-whatsapp"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-extrabold text-yamet-teal-700 shadow-glow transition-shadow hover:shadow-2xl sm:text-lg"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Konsultasi via WhatsApp
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
