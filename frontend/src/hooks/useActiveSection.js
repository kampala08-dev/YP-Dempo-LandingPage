import { useEffect, useState } from "react";

/* Scroll-spy ringan: section mana yang sedang menempati bagian atas layar,
   untuk penanda menu aktif (aria-current) di navbar. */
export default function useActiveSection(ids) {
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (typeof IntersectionObserver === "undefined") return undefined;
        const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!els.length) return undefined;
        const visible = new Map();
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => visible.set(en.target.id, en.isIntersecting));
                const first = els.find((el) => visible.get(el.id));
                setActive(first ? first.id : null);
            },
            // pita 0–40% dari atas viewport (di bawah navbar)
            { rootMargin: "-88px 0px -60% 0px", threshold: 0 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps

    return active;
}
