import Image from "next/image";

const INFORMACION = [
  { texto: "Sobre nosotros", href: "/sobre-nosotros" },
  { texto: "Envíos" },
  { texto: "Cambios y devoluciones" },
  { texto: "Garantía y cuidados" },
  { texto: "Medios de pago" },
  { texto: "Preguntas frecuentes" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--text-inverse-soft)" }}>
      <div
        className="container"
        style={{
          padding: "72px 6% 40px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
          gap: 48,
        }}
      >
        <div>
          <Image
            src="/logo-blanco.png"
            alt="Levin Joyería & Relojería"
            width={320}
            height={165}
            style={{ height: 64, width: "auto", marginBottom: 24 }}
          />
          <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: "30ch" }}>
            Joyería y relojería en Paraná. Más de 50 años acompañando momentos que perduran.
          </p>
        </div>

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Visitanos
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>
            <a href="https://maps.google.com/?q=Perú+134,+Paraná,+Entre+Ríos" target="_blank" rel="noopener noreferrer">
              Perú 134, Paraná, Entre Ríos.
            </a>
          </p>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Horarios
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Lunes a viernes 9:00–13:00 y 16:00–20:00
            <br />
            Sábados 9:00–13:00 · Domingo cerrado
          </p>
        </div>

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Contacto
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a href="https://wa.me/5493434728312" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="https://instagram.com/joyerialevin" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/joyeriayrelojerialevin" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Información
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            {INFORMACION.map((item) =>
              item.href ? (
                <a key={item.texto} href={item.href}>
                  {item.texto}
                </a>
              ) : (
                <span key={item.texto} style={{ color: "var(--text-inverse-soft)" }}>
                  {item.texto}
                </span>
              )
            )}
          </div>
        </div>
      </div>
      <div
        className="container stamp"
        style={{
          padding: "22px 6% 40px",
          borderTop: "1px solid rgba(253,252,248,0.15)",
          fontSize: 10,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Joyería Levin · Todos los derechos reservados
      </div>
    </footer>
  );
}
