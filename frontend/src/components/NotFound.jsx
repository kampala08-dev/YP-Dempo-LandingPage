import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { waLink } from "../data/site";

export default function NotFound() {
    useEffect(() => {
        document.title = "Halaman tidak ditemukan — YAMET Palembang Dempo";
        return () => {
            document.title = "YAMET Palembang Dempo — Pusat Tumbuh Kembang Anak";
        };
    }, []);

    return (
        <main className="flex min-h-dvh flex-col items-center justify-center bg-yamet-cream px-5 py-16 text-center text-yamet-ink">
            <Logo className="h-12" />
            <p className="mt-10 font-heading text-7xl font-black text-yamet-teal-600/20">404</p>
            <h1 className="mt-2 font-heading text-3xl font-black tracking-tight sm:text-4xl">Halaman tidak ditemukan</h1>
            <p className="mt-3 max-w-md text-base text-yamet-ink-muted">
                Tautannya mungkin salah ketik atau halamannya sudah dipindah.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/" className="inline-flex items-center justify-center rounded-full bg-yamet-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-glow transition-all hover:bg-yamet-teal-700 active:scale-[0.98]">
                    Ke beranda
                </Link>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-yamet-teal/30 bg-white px-7 py-3 text-sm font-bold text-yamet-teal-600 transition-all hover:border-yamet-teal-600 active:scale-[0.98]">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Chat WhatsApp
                </a>
            </div>
        </main>
    );
}
