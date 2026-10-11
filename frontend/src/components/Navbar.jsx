import React, { useEffect, useState } from "react";
import useActiveSection from "../hooks/useActiveSection";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { NAV_LINKS, waLink } from "../data/site";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const active = useActiveSection(NAV_LINKS.map((l) => l.href.slice(1)));

    // Esc menutup menu HP
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white/80 backdrop-blur-xl shadow-soft"
                    : "bg-transparent"
            }`}
            data-testid="site-navbar"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
                <a href="#hero" data-testid="navbar-logo-link" className="flex min-h-[44px] shrink-0 items-center">
                    <Logo className="h-10" />
                </a>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            data-testid={`nav-link-${l.href.replace("#", "")}`}
                            aria-current={active === l.href.slice(1) ? "location" : undefined}
                            className={`group relative py-3 text-sm font-semibold transition-colors hover:text-yamet-brick ${
                                active === l.href.slice(1) ? "text-yamet-brick" : "text-yamet-ink/80"
                            }`}
                        >
                            {l.label}
                            <span
                                className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left rounded-full bg-yamet-brick transition-transform duration-300 ${
                                    active === l.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                }`}
                            />
                        </a>
                    ))}
                </nav>

                <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="navbar-cta-whatsapp"
                    className="hidden items-center gap-2 rounded-full bg-yamet-brick px-5 py-3 text-sm font-bold text-white shadow-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-yamet-brick-dark hover:shadow-lg active:translate-y-0 active:scale-[0.98] lg:inline-flex"
                >
                    <MessageCircle className="h-4 w-4" />
                    Konsultasi
                </a>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Tutup menu" : "Buka menu"}
                    aria-expanded={open}
                    aria-controls="menu-mobile"
                    data-testid="navbar-mobile-toggle"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-white/70 px-3 text-sm font-bold text-yamet-ink shadow-soft backdrop-blur-md transition-transform active:scale-95 lg:hidden"
                >
                    {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
                    {open ? "Tutup" : "Menu"}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        id="menu-mobile"
                        className="overflow-hidden border-t border-yamet-gold/10 bg-white/95 backdrop-blur-xl lg:hidden"
                        data-testid="navbar-mobile-menu"
                    >
                        <div className="space-y-1 px-5 py-4">
                            {NAV_LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    data-testid={`nav-link-mobile-${l.href.replace("#", "")}`}
                                    className="block rounded-xl px-3 py-3 text-base font-semibold text-yamet-ink transition-colors hover:bg-yamet-sun-50 hover:text-yamet-brick active:bg-yamet-sun-100"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <a
                                href={waLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="navbar-mobile-cta-whatsapp"
                                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-yamet-brick px-5 py-3 text-sm font-bold text-white shadow-glow transition-all hover:bg-yamet-brick-dark active:translate-y-0 active:scale-[0.98]"
                            >
                                <MessageCircle className="h-4 w-4" />
                                Konsultasi
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
