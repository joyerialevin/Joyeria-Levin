"use client";

import { useEffect, useState } from "react";

const FOTOS = [
  { src: "/fotos/sobre-historia-1.jpg", alt: "Ricardo junto a Clara, su madre, en el local" },
  { src: "/fotos/sobre-historia-2.jpg", alt: "Fachada histórica de Joyería y Relojería Levin" },
  { src: "/fotos/sobre-historia-3.jpg", alt: "Nanci, esposa de Ricardo, en el local" },
];

export default function HistoriaCarousel() {
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setActiva((i) => (i + 1) % FOTOS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="container" style={{ padding: "0 6% 70px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          aspectRatio: "4 / 3",
          borderRadius: "var(--radius-sm)",
          overflow: "hidden",
        }}
      >
        {FOTOS.map((f, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={f.src}
            src={f.src}
            alt={f.alt}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: i === activa ? 1 : 0,
              transition: "opacity 0.9s ease",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
        {FOTOS.map((f, i) => (
          <button
            key={f.src}
            type="button"
            aria-label={`Ver foto ${i + 1} de ${FOTOS.length}`}
            aria-current={i === activa}
            onClick={() => setActiva(i)}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: i === activa ? "var(--oro)" : "var(--line)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
