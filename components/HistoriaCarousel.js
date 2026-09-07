"use client";

import { useEffect, useRef, useState } from "react";

const FOTOS = [
  {
    src: "/fotos/sobre-carrusel-frente.jpg",
    alt: "Frente de Joyería Levin en Perú 134",
    caption: "Perú 134 · el frente de siempre",
  },
  {
    src: "/fotos/sobre-carrusel-nanci.jpg",
    alt: "Salón de Joyería Levin, febrero de 1995",
    caption: "Joyería Levin · 12/02/1995",
  },
  {
    src: "/fotos/sobre-carrusel-ricardo-clara.jpg",
    alt: "Ricardo Levin junto a Clara, su madre",
    caption: "Ricardo Levin junto a Clara, su madre",
    objectPosition: "50% 30%",
  },
];

export default function HistoriaCarousel() {
  const [activa, setActiva] = useState(0);
  const timerRef = useRef(null);

  function iniciarRotacion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => {
      setActiva((i) => (i + 1) % FOTOS.length);
    }, 5000);
  }

  useEffect(() => {
    iniciarRotacion();
    return () => clearInterval(timerRef.current);
  }, []);

  function irA(i) {
    clearInterval(timerRef.current);
    setActiva(i);
    iniciarRotacion();
  }

  return (
    <div style={{ position: "relative", minHeight: 460, height: "100%", background: "var(--ink)", overflow: "hidden" }}>
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
            objectPosition: f.objectPosition || "50% 50%",
            transition: "opacity 1400ms ease",
            opacity: i === activa ? 1 : 0,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "28px 24px 22px",
          background: "linear-gradient(180deg, rgba(38,38,31,0), rgba(38,38,31,0.85))",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <span className="stamp" style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--sand-200)" }}>
          {FOTOS[activa].caption}
        </span>
        <div style={{ display: "flex", gap: 10, flex: "none" }}>
          {FOTOS.map((f, i) => (
            <button
              key={f.src}
              type="button"
              aria-label={`Foto ${i + 1} de ${FOTOS.length}`}
              aria-current={i === activa}
              onClick={() => irA(i)}
              style={{
                width: 26,
                height: 2,
                padding: 0,
                border: 0,
                cursor: "pointer",
                background: i === activa ? "var(--oro-20)" : "rgba(253,252,248,0.35)",
                transition: "background 240ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
