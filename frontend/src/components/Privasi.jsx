import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "./Logo";
import { WHATSAPP_DISPLAY, waLink } from "../data/site";

const DIPERBARUI = "11 Oktober 2026";

export default function Privasi() {
    useEffect(() => {
        document.title = "Kebijakan Privasi — YAMET Palembang Dempo";
        window.scrollTo(0, 0);
        return () => {
            document.title = "YAMET Palembang Dempo — Pusat Tumbuh Kembang Anak";
        };
    }, []);

    return (
        <main className="min-h-dvh bg-yamet-cream px-5 py-10 text-yamet-ink lg:px-8">
            <article className="mx-auto max-w-2xl">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-yamet-brick hover:underline">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Kembali ke beranda
                </Link>
                <div className="mt-8">
                    <Logo className="h-12" />
                </div>
                <h1 className="mt-6 font-heading text-3xl font-black tracking-tight sm:text-4xl">Kebijakan privasi</h1>
                <p className="mt-2 text-sm text-yamet-ink-muted">Diperbarui {DIPERBARUI}</p>

                <div className="mt-8 space-y-6 text-base leading-relaxed text-yamet-ink-muted">
                    <section>
                        <h2 className="font-heading text-lg font-extrabold text-yamet-ink">Data yang kami kumpulkan</h2>
                        <p className="mt-2">
                            Lewat formulir di situs ini, Anda dapat mengirim nama orang tua, nomor WhatsApp, usia anak
                            (opsional), dan keluhan atau kebutuhan terapi. Kami tidak memasang cookie pelacak dan tidak
                            memakai layanan iklan.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-heading text-lg font-extrabold text-yamet-ink">Untuk apa data dipakai</h2>
                        <p className="mt-2">
                            Hanya untuk menghubungi Anda kembali lewat WhatsApp dan menyiapkan konsultasi awal. Kami
                            tidak menjual atau membagikan data Anda ke pihak lain.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-heading text-lg font-extrabold text-yamet-ink">Penyimpanan</h2>
                        <p className="mt-2">
                            Data disimpan di server milik YAMET Palembang Dempo dan hanya dapat diakses tim admin kami.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-heading text-lg font-extrabold text-yamet-ink">Foto di galeri</h2>
                        <p className="mt-2">
                            Foto kegiatan terapi ditampilkan atas izin orang tua. Bila Anda orang tua dari anak yang
                            tampak di foto dan ingin fotonya diturunkan, hubungi kami dan foto akan dihapus.
                        </p>
                    </section>
                    <section>
                        <h2 className="font-heading text-lg font-extrabold text-yamet-ink">Hak Anda</h2>
                        <p className="mt-2">
                            Anda dapat meminta data yang pernah Anda kirim untuk dilihat atau dihapus kapan saja lewat
                            WhatsApp{" "}
                            <a href={waLink("Halo YAMET, saya ingin bertanya soal data pribadi saya.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-yamet-brick underline underline-offset-2">
                                {WHATSAPP_DISPLAY}
                            </a>
                            .
                        </p>
                    </section>
                </div>
            </article>
        </main>
    );
}
