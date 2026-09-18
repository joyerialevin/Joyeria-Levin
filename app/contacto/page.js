"use client";

import { useState } from "react";
import VisitanosSection from "../../components/VisitanosSection";

const NUMERO_WHATSAPP = "5493434728312";
const LINK_WHATSAPP_DIRECTO = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(
  "Hola! Vi la web de Joyería Levin y quería hacer una consulta."
)}`;

const MOTIVOS = [
  "Consulta por una pieza del catálogo",
  "Alianzas y anillos de compromiso",
  "Service de relojería",
  "Arreglo de joyas",
  "Grabados personalizados",
  "Tasación de Oro y Plata",
];

const METODOS = [
  {
    nombre: "WhatsApp",
    valor: "+54 9 343 472 8312",
    nota: "Respuesta en el día",
    href: LINK_WHATSAPP_DIRECTO,
  },
  {
    nombre: "Instagram",
    valor: "@joyerialevin",
    nota: "Novedades y piezas nuevas",
    href: "https://instagram.com/joyerialevin",
  },
];

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-sm)",
  background: "var(--card-bg)",
  color: "var(--ink)",
  fontSize: 15,
  fontFamily: "inherit",
};

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    motivo: "",
    mensaje: "",
  });

  function actualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function enviarPorWhatsApp(e) {
    e.preventDefault();
    const sinPuntoFinal = (s) => s.trim().replace(/[.\s]+$/, "");
    const partes = [`Hola! Soy ${form.nombre || "un cliente"}.`, `Motivo: ${form.motivo}.`];
    if (form.mensaje) partes.push(`Mensaje: ${sinPuntoFinal(form.mensaje)}.`);
    const mensaje = partes.join(" ");
    window.open(`https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section style={{ background: "rgba(130,120,56,0.05)" }}>
        <div className="container" style={{ padding: "80px 6% 70px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 56,
          }}
          className="contacto-grid"
        >
          <div>
            <h1 className="display" style={{ fontSize: 40, lineHeight: 1.14, margin: "0 0 10px", maxWidth: 620 }}>
              ¿En qué podemos ayudarte?
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 14px", maxWidth: 620 }}>
              Completá estos datos y te llevamos a WhatsApp con el mensaje listo para enviar. Te responderá una
              persona de nuestro local.
            </p>

          <form onSubmit={enviarPorWhatsApp} style={{ maxWidth: 520 }}>
            <label style={{ display: "block", marginBottom: 18 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                1. Tu nombre
              </div>
              <input
                type="text"
                required
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => actualizar("nombre", e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: "block", marginBottom: 18 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                2. ¿Qué necesitás?
              </div>
              <select
                required
                value={form.motivo}
                onChange={(e) => actualizar("motivo", e.target.value)}
                style={inputStyle}
              >
                <option value="" disabled>
                  Seleccioná una opción
                </option>
                {MOTIVOS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 22 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                3. Contanos un poco más
              </div>
              <textarea
                rows={4}
                placeholder="Qué pieza buscás, material, talle o modelo de reloj."
                value={form.mensaje}
                onChange={(e) => actualizar("mensaje", e.target.value)}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              />
            </label>

            <button
              type="submit"
              className="stamp"
              style={{
                color: "var(--porcelain)",
                background: "var(--oro)",
                padding: "15px 30px",
                border: "none",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
              }}
            >
              Continuar por WhatsApp
            </button>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6 }}>
              Se abrirá WhatsApp. Podrás revisar el mensaje antes de enviarlo.
            </p>
          </form>
          </div>

          <div style={{ maxWidth: 340, marginLeft: "auto" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              {METODOS.map((m) => (
                <a
                  key={m.nombre}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift"
                  style={{
                    display: "block",
                    flex: 1,
                    padding: "16px 16px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--oro)",
                    color: "var(--porcelain)",
                  }}
                >
                  <div className="stamp" style={{ fontSize: 10.5, color: "var(--text-inverse-soft)", marginBottom: 6 }}>
                    {m.nombre}
                  </div>
                  <div style={{ fontSize: 13.5, marginBottom: 3 }}>{m.valor}</div>
                  <div style={{ fontSize: 11, color: "var(--text-inverse-soft)" }}>{m.nota}</div>
                </a>
              ))}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/contacto-packaging.jpg"
              alt="Compra envuelta en packaging de Joyería Levin"
              style={{
                width: "100%",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "50% 15%",
                display: "block",
                borderRadius: "var(--radius-sm)",
              }}
            />
          </div>
        </div>
        </div>
      </section>

      <VisitanosSection />

      <style>{`
        @media (max-width: 760px) {
          .contacto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
