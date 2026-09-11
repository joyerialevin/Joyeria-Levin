"use client";

import { useEffect, useRef, useState } from "react";

const PASOS = [
  { titulo: "Recibimos y revisamos", body: "Tomamos tu reloj en el local y lo evaluamos con detalle." },
  { titulo: "Te contamos el trabajo", body: "Explicamos la solución, el costo y el plazo, sin tecnicismos." },
  { titulo: "Esperamos tu aprobación", body: "Avanzamos únicamente cuando nos das el sí." },
  { titulo: "Te avisamos cuando está listo", body: "Lo retirás en el local o coordinamos el envío." },
];

export default function ServiceProcesoPasos() {
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
    const id = setInterval(() => setActivo((a) => (a + 1) % PASOS.length), 4200);
    return () => clearInterval(id);
  }, [reducirMovimiento, enVista]);

  return (
    <div
      ref={sectionRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
        gap: "clamp(14px, 1.6vw, 20px)",
        marginBottom: "clamp(26px, 3vw, 40px)",
      }}
    >
      {PASOS.map((paso, i) => {
        const activa = !reducirMovimiento && i === activo;
        return (
          <div
            key={paso.titulo}
            style={{
              borderRadius: "var(--radius-sm)",
              padding: "28px 26px 30px",
              transition: "background-color 900ms ease, border-color 900ms ease, box-shadow 900ms ease",
              backgroundColor: activa ? "var(--oro-90)" : "var(--porcelain)",
              border: `1px solid ${activa ? "var(--oro-90)" : "var(--sand-200)"}`,
              boxShadow: activa ? "0 10px 26px rgba(130,120,56,0.2)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 36,
                lineHeight: 1,
                marginBottom: 18,
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--oro-40)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                fontSize: 21,
                lineHeight: 1.25,
                margin: "0 0 10px",
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--ink)",
              }}
            >
              {paso.titulo}
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                margin: 0,
                transition: "color 900ms ease",
                color: activa ? "var(--porcelain)" : "var(--ink-soft)",
              }}
            >
              {paso.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
