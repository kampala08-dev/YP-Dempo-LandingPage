import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { waLink } from "../data/site";

export default function FloatingWhatsapp() {
    const [showTip, setShowTip] = useState(false);

    // Tip muncul sekali; setelah ditutup tidak muncul lagi di perangkat itu
    useEffect(() => {
        try {
            if (window.localStorage.getItem("yamet-wa-tip") === "tutup") return undefined;
        } catch (e) {
            /* penyimpanan diblokir: tampilkan saja */
        }
        const t = setTimeout(() => setShowTip(true), 2500);
        return () => clearTimeout(t);
    }, []);

    const closeTip = () => {
        setShowTip(false);
        try {
            window.localStorage.setItem("yamet-wa-tip", "tutup");
        } catch (e) {
            /* abaikan */
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-6 sm:right-6" data-testid="floating-whatsapp-wrap">
            <AnimatePresence>
                {showTip && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative hidden max-w-[260px] rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-yamet-ink shadow-glow ring-1 ring-yamet-teal/15 sm:block"
                        data-testid="floating-whatsapp-tip"
                    >
                        <button
                            type="button"
                            onClick={closeTip}
                            aria-label="Tutup tip"
                            className="absolute -right-4 -top-4 flex h-11 w-11 items-center justify-center rounded-full text-yamet-ink-muted hover:text-yamet-ink"
                        >
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow ring-1 ring-yamet-teal/10">
                                <X className="h-3 w-3" />
                            </span>
                        </button>
                        <div className="text-yamet-teal-600">Halo Bunda & Ayah</div>
                        <div className="text-yamet-ink-muted">
                            Butuh konsultasi tumbuh kembang? Chat kami sekarang.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="floating-whatsapp-button"
                aria-label="Hubungi via WhatsApp"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 14 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-glow motion-safe:animate-pulse-ring sm:h-16 sm:w-16"
            >
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.a>
        </div>
    );
}
