"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PASOS = [
  { year: "1973", label: "El comienzo, en Perú 134" },
  { year: "Después", label: "Clara y Ricardo sostienen el oficio" },
  { year: "1991", label: "Ricardo y Nanci, una nueva etapa" },
  { year: "Hoy", label: "Más de 50 años en el mismo lugar" },
];

export default function SobreLineaDeTiempo() {
  const [paso, setPaso] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    function sync() {
      const items = refs.current.filter(Boolean);
      if (!items.length) return;
      const mid = window.innerHeight / 2;
      let mejor = 0;
      let mejorDist = Infinity;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + Math.min(r.height, window.innerHeight * 0.8) / 2 - mid);
        if (d < mejorDist) {
          mejorDist = d;
          mejor = i;
        }
      });
      setPaso(mejor);
    }
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section id="origen" className="container" style={{ maxWidth: 1120, padding: "104px 6% 40px" }}>
      <div className="sobre-story">
        <aside className="sobre-aside">
          <div className="stamp" style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--ink-soft)" }}>
            Nuestra historia
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(56px, 8vw, 92px)",
              lineHeight: 1,
              color: "var(--oro)",
              margin: "12px 0 6px",
              transition: "opacity 400ms ease",
            }}
          >
            {PASOS[paso].year}
          </div>
          <div style={{ fontSize: 17, color: "var(--ink-soft)" }}>{PASOS[paso].label}</div>
          <div style={{ marginTop: 26, width: 1, height: 120, background: "var(--line)", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 1,
                background: "var(--oro)",
                height: `${((paso + 1) / PASOS.length) * 100}%`,
                transition: "height 600ms ease",
              }}
            />
          </div>
        </aside>

        <div>
          <div ref={(el) => (refs.current[0] = el)} className={`sobre-item${paso === 0 ? " is-act" : ""}`}>
            <span
              className="sobre-item-eyebrow stamp"
              style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--oro-deep)", marginBottom: 10 }}
            >
              1973
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(24px, 2.6vw, 30px)",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              El comienzo
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: 0, maxWidth: "54ch" }}>
              David Levin llegó a Paraná con años de oficio como orfebre y abrió un pequeño taller en Perú 134.
              Allí restauraba y fabricaba piezas a mano.
            </p>
          </div>

          <div ref={(el) => (refs.current[1] = el)} className={`sobre-item${paso === 1 ? " is-act" : ""}`}>
            <span
              className="sobre-item-eyebrow stamp"
              style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--oro-deep)", marginBottom: 10 }}
            >
              Los años siguientes
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(24px, 2.6vw, 30px)",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              La continuidad
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: 0, maxWidth: "54ch" }}>
              Tras su fallecimiento, Clara mantuvo el negocio en marcha y Ricardo, su hijo, comenzó a aprender el
              oficio. Con el tiempo,{" "}
              <span style={{ background: "linear-gradient(to top, var(--oro-marcador) 88%, transparent 88%)" }}>
                el taller se transformó en una joyería y relojería
              </span>
              , conservando la dedicación y los valores de su fundador.
            </p>
          </div>

          <div ref={(el) => (refs.current[2] = el)} className={`sobre-item${paso === 2 ? " is-act" : ""}`}>
            <span
              className="sobre-item-eyebrow stamp"
              style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--oro-deep)", marginBottom: 10 }}
            >
              1991
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(24px, 2.6vw, 30px)",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              Una nueva etapa
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: 0, maxWidth: "54ch" }}>
              Ricardo asumió la conducción del negocio. Junto a Nanci, su esposa, renovaron el local, incorporaron
              nuevas propuestas y acercaron Levin a nuevas familias de Paraná.
            </p>
          </div>

          <div ref={(el) => (refs.current[3] = el)} id="hoy" className={`sobre-item${paso === 3 ? " is-act" : ""}`}>
            <span
              className="sobre-item-eyebrow stamp"
              style={{ fontWeight: 300, letterSpacing: "0.14em", color: "var(--oro-deep)", marginBottom: 10 }}
            >
              Hoy
            </span>
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(24px, 2.6vw, 30px)",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              La historia continúa
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.75, margin: "0 0 28px", maxWidth: "54ch" }}>
              Más de 50 años después, Levin continúa en el mismo lugar donde comenzó todo. Nuestro equipo mantiene
              vivo ese legado con atención cercana, honestidad y dedicación.
            </p>

            <figure style={{ margin: "0 0 28px", maxWidth: 480 }}>
              {/* TODO: reemplazar por la foto actual del frente que enviará la clienta. */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  background: "var(--sunken)",
                  border: "1px dashed var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
                  Foto actual del frente — próximamente
                </span>
              </div>
              <figcaption
                className="stamp"
                style={{ marginTop: 10, fontWeight: 300, letterSpacing: "0.14em", color: "var(--ink-soft)" }}
              >
                Perú 134 · hoy
              </figcaption>
            </figure>

            <div
              className="stamp"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                alignItems: "center",
                fontWeight: 300,
                letterSpacing: "0.14em",
                color: "var(--ink-soft)",
                borderTop: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
                padding: "16px 0",
              }}
            >
              <span>Más de 50 años</span>
              <span style={{ color: "var(--sand-400)" }}>·</span>
              <span>Desde 1973</span>
              <span style={{ color: "var(--sand-400)" }}>·</span>
              <span>Perú 134</span>
            </div>

            <div style={{ marginTop: 28 }}>
              <Link href="/catalogo" className="stamp btn-oro">
                Conocé nuestras joyas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
