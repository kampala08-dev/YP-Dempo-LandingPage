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
                /* YAMET brand */
                yamet: {
                    teal: "#3A868F",
                    "teal-50": "#E3F2F6",
                    "teal-100": "#C9E6EC",
                    "teal-600": "#2E7079", /* teks & tombol: putih di atasnya 5,7:1 */
                    "teal-700": "#2A6168",
                    peach: "#FFB5A7",
                    "peach-50": "#FFE9E3",
                    orange: "#F4A261",
                    cream: "#FDFBF7",
                    ink: "#1F333E",
                    "ink-muted": "#5B707B",
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
                soft: "0 4px 18px -6px rgba(58, 134, 143, 0.15)",
                glow: "0 8px 30px -8px rgba(58, 134, 143, 0.28)",
                peach: "0 8px 30px -8px rgba(255, 181, 167, 0.55)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
