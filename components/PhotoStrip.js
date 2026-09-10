"use client";

import { useEffect, useState } from "react";

const SLOTS = 6;
const INTERVALO_MS = 4000;

const FOTOS = [
  { src: "/fotos/maxi-modelo-manos-anillos.jpg", alt: "Modelo luciendo anillos y pulsera" },
  { src: "/fotos/maxi-modelo-mano-cara.jpg", alt: "Modelo luciendo anillos" },
  { src: "/fotos/maxi-modelo-manos-anillos-2.jpg", alt: "Modelo luciendo anillos" },
  { src: "/fotos/maxi-modelo-brazos-cruzados.jpg", alt: "Modelo luciendo joyas" },
  { src: "/fotos/maxi-modelo-pulsera-muneca.jpg", alt: "Modelo luciendo pulsera" },
  { src: "/fotos/maxi-modelo-collar.jpg", alt: "Modelo luciendo collar" },
  { src: "/fotos/maxi-modelo-collar-2.jpg", alt: "Modelo luciendo collar" },
  { src: "/fotos/maxi-modelo-mano-menton.jpg", alt: "Modelo luciendo anillos" },
  { src: "/fotos/maxi-modelo-reloj-pulsera.jpg", alt: "Modelo luciendo reloj y pulsera" },
  { src: "/fotos/maxi-modelo-mano-cara-2.jpg", alt: "Modelo luciendo anillos" },
];

export default function PhotoStrip() {
  const [inicio, setInicio] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setInicio((i) => (i + 1) % FOTOS.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, []);

  const visibles = Array.from({ length: SLOTS }, (_, i) => FOTOS[(inicio + i) % FOTOS.length]);

  return (
    <section style={{ padding: "8px 0 72px" }}>
      <div
        className="container"
        style={{
          padding: "0 6%",
          marginBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
          El detalle, de cerca
        </div>
        <a href="https://instagram.com/joyerialevin" target="_blank" rel="noopener noreferrer" className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
          @joyerialevin
        </a>
      </div>
      <div
        className="scroll-row"
        style={{ padding: "0 6%", gap: 10 }}
      >
        {visibles.map((foto, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${i}-${foto.src}`}
            src={foto.src}
            alt={foto.alt}
            className="levin-fade"
            style={{ width: 220, aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
          />
        ))}
      </div>
    </section>
  );
}
