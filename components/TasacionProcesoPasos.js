"use client";

import { useEffect, useRef, useState } from "react";

export default function TasacionProcesoPasos({ pasos }) {
  const [activo, setActivo] = useState(0);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const [enVista, setEnVista] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    setReducirMovimiento(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setEnVista(entry.isIntersecting), { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reducirMovimiento || !enVista) return;
    const id = setInterval(() => setActivo((a) => (a + 1) % pasos.length), 4200);
    return () => clearInterval(id);
  }, [reducirMovimiento, enVista, pasos.length]);

  return (
    <div ref={sectionRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 3vw, 40px)" }} className="tasacion-grid-3">
      {pasos.map((paso, i) => {
        const activa = !reducirMovimiento && i === activo;
        return (
          <div
            key={paso.numero}
            style={{
              borderRadius: "var(--radius-sm)",
              padding: "20px 22px 24px",
              transition: "background-color 900ms ease, border-color 900ms ease, box-shadow 900ms ease",
              backgroundColor: activa ? "var(--oro-90)" : "transparent",
              borderTop: `2px solid ${activa ? "var(--oro-90)" : "var(--ink)"}`,
              boxShadow: activa ? "0 10px 26px rgba(130,120,56,0.2)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 34,
                lineHeight: 1,
                marginBottom: 12,
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--oro)",
              }}
            >
              {paso.numero}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 17,
                margin: "0 0 8px",
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--ink)",
              }}
            >
              {paso.titulo}
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.6,
                margin: 0,
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--ink-soft)",
              }}
            >
              {paso.texto}
            </p>
          </div>
        );
      })}
    </div>
  );
}
