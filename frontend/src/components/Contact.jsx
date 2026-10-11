import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, Clock, Instagram, Loader2, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
    ADDRESS,
    OPENING_HOURS,
    INSTAGRAM_HANDLE,
    INSTAGRAM_URL,
    MAPS_EMBED_URL,
    MAPS_LINK,
    WHATSAPP_DISPLAY,
    waLink,
} from "../data/site";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const INPUT =
    "mt-1.5 block w-full rounded-2xl border bg-yamet-cream/50 px-4 py-3 text-sm font-medium text-yamet-ink placeholder-yamet-ink-muted/70 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-yamet-teal/20";
const inputCls = (bad) => `${INPUT} ${bad ? "border-brand-red focus:border-brand-red" : "border-yamet-teal/15 focus:border-yamet-teal"}`;

// Pemeriksaan sederhana di sisi pengunjung; aturan yang sama ada di server.
function validate(f) {
    const err = {};
    if (f.parent_name.trim().length < 2) err.parent_name = "Mohon isi nama Anda.";
    const digits = f.whatsapp.replace(/[^\d]/g, "");
    if (digits.length < 9 || digits.length > 15) err.whatsapp = "Nomor WhatsApp belum lengkap. Contoh: 0812 3456 7890.";
    if (f.concern.trim().length < 5) err.concern = "Ceritakan singkat kebutuhan anak Anda (minimal 5 huruf).";
    return err;
}

export default function Contact() {
    const [form, setForm] = useState({ parent_name: "", whatsapp: "", child_age: "", concern: "" });
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});

    const handle = (k) => (e) => {
        const v = e.target.value;
        setForm((s) => ({ ...s, [k]: v }));
        setErrors((er) => (er[k] ? { ...er, [k]: undefined } : er));
        if (done) setDone(false); // mulai mengisi lagi = pesan baru
    };

    const submit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        const err = validate(form);
        if (Object.keys(err).length) {
            setErrors(err);
            document.getElementById(Object.keys(err)[0])?.focus();
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(`${API}/leads`, form);
            setDone(true);
            toast.success("Terima kasih. Tim YAMET akan menghubungi Anda lewat WhatsApp pada jam operasional.");
            setForm({ parent_name: "", whatsapp: "", child_age: "", concern: "" });
        } catch (err) {
            const msg = err?.response?.data?.detail || "Gagal mengirim. Mohon coba lagi atau hubungi via WhatsApp.";
            toast.error(typeof msg === "string" ? msg : "Gagal mengirim. Mohon coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            id="kontak"
            data-testid="contact-section"
            className="relative py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-yamet-teal/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-yamet-teal-600 shadow-sm">
                        Kontak & Lokasi
                    </div>
                    <h2 className="mt-6 font-heading text-4xl font-black leading-[1.08] tracking-tight text-yamet-ink sm:text-5xl">
                        Mari{" "}
                        <span className="text-yamet-teal">bertemu</span> & berbagi cerita.
                    </h2>
                </motion.div>

                <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7"
                    >
                        <form
                            onSubmit={submit}
                            noValidate
                            data-testid="contact-form"
                            className="rounded-[28px] bg-white p-6 border border-yamet-ink/10 shadow-soft sm:p-8"
                        >
                            <h3 className="font-heading text-xl font-extrabold text-yamet-ink sm:text-2xl">
                                Tinggalkan pesan
                            </h3>
                            <p className="mt-1.5 text-sm text-yamet-ink-muted">
                                Isi singkat, tim kami akan menghubungi Anda lewat WhatsApp.
                            </p>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-yamet-ink-muted" htmlFor="parent_name">
                                        Nama Orang Tua *
                                    </label>
                                    <input
                                        id="parent_name"
                                        type="text"
                                        required
                                        value={form.parent_name}
                                        onChange={handle("parent_name")}
                                        data-testid="form-parent-name"
                                        placeholder="Misal: Ibu Siti"
                                        aria-invalid={Boolean(errors.parent_name)}
                                        aria-describedby={errors.parent_name ? "parent_name-error" : undefined}
                                        className={inputCls(errors.parent_name)}
                                    />
                                    {errors.parent_name && (
                                        <p id="parent_name-error" role="alert" className="mt-1.5 text-xs font-semibold text-brand-red">{errors.parent_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider text-yamet-ink-muted" htmlFor="whatsapp">
                                        Nomor WhatsApp *
                                    </label>
                                    <input
                                        id="whatsapp"
                                        type="tel"
                                        required
                                        value={form.whatsapp}
                                        onChange={handle("whatsapp")}
                                        data-testid="form-whatsapp"
                                        placeholder="0812 3456 7890"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        aria-invalid={Boolean(errors.whatsapp)}
                                        aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                                        className={inputCls(errors.whatsapp)}
                                    />
                                    {errors.whatsapp && (
                                        <p id="whatsapp-error" role="alert" className="mt-1.5 text-xs font-semibold text-brand-red">{errors.whatsapp}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-yamet-ink-muted" htmlFor="child_age">
                                        Usia Anak (opsional)
                                    </label>
                                    <input
                                        id="child_age"
                                        type="text"
                                        value={form.child_age}
                                        onChange={handle("child_age")}
                                        data-testid="form-child-age"
                                        placeholder="Misal: 2 tahun 6 bulan"
                                        className={inputCls(false)}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-yamet-ink-muted" htmlFor="concern">
                                        Keluhan / Kebutuhan *
                                    </label>
                                    <textarea
                                        id="concern"
                                        required
                                        rows={4}
                                        value={form.concern}
                                        onChange={handle("concern")}
                                        data-testid="form-concern"
                                        placeholder="Ceritakan singkat kondisi anak atau kebutuhan terapinya..."
                                        aria-invalid={Boolean(errors.concern)}
                                        aria-describedby={errors.concern ? "concern-error" : undefined}
                                        className={`resize-none ${inputCls(errors.concern)}`}
                                    />
                                    {errors.concern && (
                                        <p id="concern-error" role="alert" className="mt-1.5 text-xs font-semibold text-brand-red">{errors.concern}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    data-testid="form-submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-yamet-teal-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:bg-yamet-teal-700 active:translate-y-0 active:scale-[0.98] disabled:opacity-70"
                                >
                                    {submitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : done ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    {done ? "Pesan terkirim" : "Kirim pesan"}
                                </button>
                                <a
                                    href={waLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="form-whatsapp-alt"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-yamet-teal/20 bg-white px-6 py-3 text-sm font-bold text-yamet-teal-600 transition-all duration-300 hover:border-yamet-teal-600 hover:shadow-soft active:translate-y-0 active:scale-[0.98]"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    Atau Chat WhatsApp
                                </a>
                            </div>
                            <p className="mt-4 text-xs text-yamet-ink-muted">
                                Dengan mengirim pesan ini, Anda setuju dihubungi tim YAMET untuk keperluan
                                konsultasi. Data Anda hanya dipakai untuk itu — lihat{" "}
                                <Link to="/privasi" className="font-semibold text-yamet-teal-600 underline underline-offset-2">
                                    kebijakan privasi
                                </Link>
                                .
                            </p>
                        </form>
                    </motion.div>

                    {/* Contact info + map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6 lg:col-span-5"
                    >
                        <div className="rounded-[28px] bg-white p-6 border border-yamet-ink/10 shadow-soft sm:p-8">
                            <h3 className="font-heading text-lg font-extrabold text-yamet-ink">
                                YAMET Palembang Dempo
                            </h3>
                            <ul className="mt-5 space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yamet-teal-50 text-yamet-teal">
                                        <MapPin className="h-4 w-4" />
                                    </span>
                                    <a
                                        href={MAPS_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid="contact-address"
                                        className="leading-relaxed text-yamet-ink hover:text-yamet-teal"
                                    >
                                        {ADDRESS}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yamet-teal-50 text-yamet-teal">
                                        <MessageCircle className="h-4 w-4" />
                                    </span>
                                    <a
                                        href={waLink()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid="contact-whatsapp"
                                        className="font-semibold text-yamet-ink hover:text-yamet-teal"
                                    >
                                        {WHATSAPP_DISPLAY} (WhatsApp)
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yamet-teal-50 text-yamet-teal">
                                        <Instagram className="h-4 w-4" />
                                    </span>
                                    <a
                                        href={INSTAGRAM_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-testid="contact-instagram"
                                        className="font-semibold text-yamet-ink hover:text-yamet-teal"
                                    >
                                        {INSTAGRAM_HANDLE}
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yamet-teal-50 text-yamet-teal">
                                        <Clock className="h-4 w-4" />
                                    </span>
                                    <div className="flex-1">
                                        <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-yamet-ink-muted">
                                            Jam operasional
                                        </div>
                                        <ul className="space-y-1">
                                            {OPENING_HOURS.map((h) => (
                                                <li
                                                    key={h.day}
                                                    className="flex items-center justify-between gap-2"
                                                >
                                                    <span className="text-yamet-ink-muted">{h.day}</span>
                                                    <span
                                                        className={`text-xs font-bold ${
                                                            h.closed ? "text-yamet-ink-muted/70" : "text-yamet-ink"
                                                        }`}
                                                    >
                                                        {h.hours}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div
                            className="overflow-hidden rounded-[28px] bg-white border border-yamet-ink/10 shadow-soft"
                            data-testid="contact-map"
                        >
                            <iframe
                                src={MAPS_EMBED_URL}
                                title="Peta YAMET Palembang Dempo"
                                className="block h-[280px] w-full border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
