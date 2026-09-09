"use client";

import { useEffect, useState } from "react";

const SLOTS = 6;
const INTERVALO_MS = 4000;

const FOTOS = [
  { src: "/fotos/maxi-aros-mesa.jpg", alt: "Aros sobre la mesa" },
  { src: "/fotos/maxi-anillos-mesa.jpg", alt: "Anillos sobre la mesa" },
  { src: "/fotos/maxi-anillo-mesa.jpg", alt: "Anillo sobre la mesa" },
  { src: "/fotos/maxi-anillo-estuche.jpg", alt: "Anillo en estuche" },
  { src: "/fotos/maxi-anillo-estuche-2.jpg", alt: "Anillo en estuche" },
  { src: "/fotos/maxi-anillo-esmeralda.jpg", alt: "Anillo con esmeralda en estuche" },
  { src: "/fotos/maxi-anillo-estuche-3.jpg", alt: "Anillo en estuche" },
  { src: "/fotos/maxi-anillo-estuche-4.jpg", alt: "Anillo en estuche" },
  { src: "/fotos/maxi-dije-colgante.jpg", alt: "Dije colgante" },
  { src: "/fotos/maxi-pulseras.jpg", alt: "Pulseras" },
  { src: "/fotos/maxi-cadenas-flatlay.jpg", alt: "Cadenas y dijes" },
  { src: "/fotos/maxi-collar-dije.jpg", alt: "Collar con dije" },
  { src: "/fotos/maxi-cadenas.jpg", alt: "Cadenas" },
  { src: "/fotos/maxi-mano-anillos.jpg", alt: "Anillos puestos en mano" },
  { src: "/fotos/maxi-mano-pulsera.jpg", alt: "Pulsera y anillos puestos" },
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
