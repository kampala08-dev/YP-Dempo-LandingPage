/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                heading: ["Nunito", "system-ui", "sans-serif"],
                body: ["DM Sans", "system-ui", "sans-serif"],
                sans: ["DM Sans", "system-ui", "sans-serif"],
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 4px)",
                sm: "calc(var(--radius) - 8px)",
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                /* YAMET brand — palet "kuning hangat" (Okt 2026):
                   kuning logo untuk sorotan/latar, cokelat tua untuk teks,
                   oranye-bata untuk tombol utama. */
                yamet: {
                    gold: "#A86F00",        /* sorotan judul & ikon (4,0:1 di krem — hanya teks besar) */
                    brick: "#C2410C",       /* tombol utama & teks aksen kecil (putih di atasnya 5,1:1) */
                    "brick-dark": "#9A3412",
                    "sun-50": "#FFF3C4",    /* latar section / ubin ikon */
                    "sun-100": "#FBE38C",
                    peach: "#FFD2A6",       /* aprikot: aksen pendamping */
                    "peach-50": "#FFEEDC",
                    orange: "#D97706",
                    cream: "#FFF9E6",
                    ink: "#3B2F1E",
                    "ink-muted": "#6E5A3E",
                },
                whatsapp: "#25D366",
                /* YAMET logo brand primaries (used as accents) */
                brand: {
                    red: "#E8462A",
                    yellow: "#F4C20D",
                    green: "#4CAF3E",
                    blue: "#2E80C9",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in-up": {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.25s ease-out",
                "accordion-up": "accordion-up 0.25s ease-out",
                "fade-in-up": "fade-in-up 0.6s ease-out forwards",
            },
            boxShadow: {
                soft: "0 4px 18px -6px rgba(168, 111, 0, 0.16)",
                glow: "0 8px 30px -8px rgba(194, 65, 12, 0.26)",
                peach: "0 8px 30px -8px rgba(255, 210, 166, 0.6)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
