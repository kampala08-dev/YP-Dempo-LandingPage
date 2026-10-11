import React from "react";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
    NAV_LINKS,
    ADDRESS,
    INSTAGRAM_HANDLE,
    INSTAGRAM_URL,
    WHATSAPP_DISPLAY,
    SEJAK_TAHUN,
    waLink,
} from "../data/site";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer data-testid="site-footer" className="relative border-t border-yamet-gold/10 bg-white pt-14 pb-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <div className="lg:col-span-5">
                    <Logo className="h-14" />
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-yamet-ink-muted">
                        Pusat terapi anak berkebutuhan khusus di Palembang, sejak tahun {SEJAK_TAHUN}.
                        Terapi wicara, sensori integrasi, okupasi, perilaku, pedagogik, dan fisioterapi.
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                        <a
                            href={INSTAGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="footer-instagram"
                            aria-label="Instagram YAMET Palembang"
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-yamet-sun-50 text-yamet-brick transition-all hover:-translate-y-0.5 hover:bg-yamet-brick hover:text-white active:translate-y-0 active:scale-[0.98]"
                        >
                            <Instagram className="h-4 w-4" />
                        </a>
                        <a
                            href={waLink()}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid="footer-whatsapp"
                            aria-label="WhatsApp YAMET Palembang"
                            className="flex h-11 w-11 items-center justify-center rounded-xl bg-yamet-sun-50 text-yamet-brick transition-all hover:-translate-y-0.5 hover:bg-whatsapp hover:text-white active:translate-y-0 active:scale-[0.98]"
                        >
                            <MessageCircle className="h-4 w-4" />
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <h2 className="font-heading text-sm font-extrabold uppercase tracking-wider text-yamet-ink">
                        Tautan cepat
                    </h2>
                    <ul className="mt-4 space-y-2.5 text-sm">
                        {NAV_LINKS.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={l.href}
                                    data-testid={`footer-link-${l.href.replace("#", "")}`}
                                    className="inline-block py-1 text-yamet-ink-muted transition-colors hover:text-yamet-brick"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-4">
                    <h2 className="font-heading text-sm font-extrabold uppercase tracking-wider text-yamet-ink">
                        Hubungi kami
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm">
                        <li className="flex items-start gap-2.5 text-yamet-ink-muted">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yamet-gold" />
                            <span>{ADDRESS}</span>
                        </li>
                        <li className="flex items-start gap-2.5 text-yamet-ink-muted">
                            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-yamet-gold" />
                            <a
                                href={waLink()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block py-1 transition-colors hover:text-yamet-brick"
                            >
                                {WHATSAPP_DISPLAY}
                            </a>
                        </li>
                        <li className="flex items-start gap-2.5 text-yamet-ink-muted">
                            <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-yamet-gold" />
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block py-1 transition-colors hover:text-yamet-brick"
                            >
                                {INSTAGRAM_HANDLE}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-7xl border-t border-yamet-gold/10 px-5 pt-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-3 text-xs text-yamet-ink-muted sm:flex-row">
                    <p>© {year} YAMET Palembang Dempo. Semua hak dilindungi.</p>
                    <Link to="/privasi" data-testid="footer-privasi" className="inline-block py-1 font-semibold transition-colors hover:text-yamet-brick">
                        Kebijakan privasi
                    </Link>
                </div>
            </div>
        </footer>
    );
}
