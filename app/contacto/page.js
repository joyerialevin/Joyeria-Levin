"use client";

import { useState } from "react";

const NUMERO_WHATSAPP = "5493434728312";
const LINK_WHATSAPP_DIRECTO = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
  "Hola! Vi la web de Joyería Levin y quería hacer una consulta."
)}`;

const MOTIVOS = [
  "Consulta por una pieza del catálogo",
  "Alianzas y anillos de compromiso",
  "Service de relojería",
  "Arreglo de joyas o grabado",
  "Tasación",
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
  {
    nombre: "Mail",
    valor: "joyerialevin@gmail.com",
    nota: "Consultas y presupuestos",
    href: "mailto:joyerialevin@gmail.com",
  },
];

const SERVICIOS = [
  { titulo: "Service de relojería", texto: "Pilas, mallas y ajuste de movimientos en taller propio." },
  { titulo: "Arreglos y grabados", texto: "Soldaduras, cambio de talle y grabados a pedido." },
  { titulo: "Tasación", texto: "Evaluación de piezas propias, sin cargo y en el momento." },
  { titulo: "Envíos", texto: "Coordinamos envío asegurado a todo el país." },
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
    contacto: "",
    motivo: MOTIVOS[0],
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
    if (form.contacto) partes.push(`Mi contacto: ${sinPuntoFinal(form.contacto)}.`);
    const mensaje = partes.join(" ");
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="container" style={{ padding: "80px 6% 40px", maxWidth: 760 }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 18 }}>
          Contactanos
        </div>
        <h1 className="display" style={{ fontSize: 40, lineHeight: 1.14, margin: "0 0 20px" }}>
          Estamos en Perú 134, Paraná.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>
          Atendemos en el local y por WhatsApp. Contanos qué pieza buscás y te respondemos con fotos y
          disponibilidad.
        </p>
      </section>

      <section className="container" style={{ padding: "10px 6% 50px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {METODOS.map((m) => (
            <a
              key={m.nombre}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift"
              style={{
                display: "block",
                padding: "22px 22px 20px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                color: "var(--ink)",
              }}
            >
              <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 10 }}>
                {m.nombre}
              </div>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{m.valor}</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{m.nota}</div>
            </a>
          ))}
          <div
            style={{
              padding: "22px 22px 20px",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              background: "var(--sunken)",
            }}
          >
            <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 10 }}>
              Horarios
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ink)" }}>
              Lun a vie 9–13 · 16–20
              <br />
              Sábados 9–13
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "20px 6% 70px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: 56,
          }}
          className="contacto-grid"
        >
          <form onSubmit={enviarPorWhatsApp} style={{ maxWidth: 520 }}>
            <h2 className="display" style={{ fontSize: 26, margin: "0 0 10px" }}>
              Consultá por una pieza
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 28px" }}>
              Armamos el mensaje y lo enviamos por WhatsApp con todos los datos.
            </p>

            <label style={{ display: "block", marginBottom: 18 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                Nombre
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
                Teléfono o mail
              </div>
              <input
                type="text"
                placeholder="343 000 0000"
                value={form.contacto}
                onChange={(e) => actualizar("contacto", e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: "block", marginBottom: 18 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                Motivo
              </div>
              <select
                value={form.motivo}
                onChange={(e) => actualizar("motivo", e.target.value)}
                style={inputStyle}
              >
                {MOTIVOS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: "block", marginBottom: 22 }}>
              <div className="stamp" style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 8 }}>
                Mensaje
              </div>
              <textarea
                rows={4}
                placeholder="Qué pieza buscás, material, talle o modelo de reloj."
                value={form.mensaje}
                onChange={(e) => actualizar("mensaje", e.target.value)}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              />
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
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
                Enviar consulta
              </button>
              <a
                href={LINK_WHATSAPP_DIRECTO}
                target="_blank"
                rel="noopener noreferrer"
                className="stamp"
                style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)", paddingBottom: 4 }}
              >
                Prefiero WhatsApp
              </a>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 18, lineHeight: 1.6 }}>
              Al enviar, se abre WhatsApp con tu consulta ya redactada — te responde una persona del local.
            </p>
          </form>

          <div>
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
                marginBottom: 28,
              }}
            />
            <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 14 }}>
              El local
            </div>
            <div style={{ fontSize: 17, color: "var(--ink)", marginBottom: 6 }}>Perú 134, Paraná</div>
            <div style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 18 }}>Entre Ríos</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 20px" }}>
              A dos cuadras de Plaza 1° de Mayo, en pleno centro. Taller propio de relojería en el mismo local.
            </p>
            <a
              href="https://maps.google.com/?q=Perú+134,+Paraná,+Entre+Ríos"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp"
              style={{ color: "var(--ink)", borderBottom: "1px solid var(--oro)", paddingBottom: 4 }}
            >
              Cómo llegar
            </a>
            <div
              style={{
                marginTop: 24,
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                border: "1px solid var(--line)",
                aspectRatio: "4 / 3",
              }}
            >
              <iframe
                title="Ubicación de Joyería Levin en el mapa"
                src="https://www.google.com/maps?q=Per%C3%BA+134,+Paran%C3%A1,+Entre+R%C3%ADos&output=embed"
                loading="lazy"
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--sunken)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "56px 6%" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 32,
            }}
          >
            {SERVICIOS.map((s) => (
              <div key={s.titulo}>
                <div style={{ width: 24, height: 1, background: "var(--oro)", marginBottom: 14 }} />
                <h3 className="stamp" style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 8 }}>
                  {s.titulo}
                </h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .contacto-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
