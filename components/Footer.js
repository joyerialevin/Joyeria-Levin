import Image from "next/image";

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
            src="/logo.png"
            alt="Levin Joyería & Relojería"
            width={320}
            height={165}
            style={{ height: 64, width: "auto", marginBottom: 24 }}
          />
          <p style={{ fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: "30ch" }}>
            Joyería y relojería en Paraná. Lo esencial siempre encuentra su lugar.
          </p>
        </div>
        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Local
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Perú 134
            <br />
            Paraná, Entre Ríos
            <br />
            Lun a sáb · 9 a 13 y 17 a 20.30
          </p>
        </div>
        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Contacto
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a href="https://wa.me/5493434728312" target="_blank" rel="noopener noreferrer">
              WhatsApp +54 9 343 472 8312
            </a>
            <a href="https://instagram.com/joyerialevin" target="_blank" rel="noopener noreferrer">
              Instagram @joyerialevin
            </a>
          </div>
        </div>
        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Secciones
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <a href="/catalogo">Catálogo</a>
            <a href="/sobre-nosotros">Sobre nosotros</a>
            <a href="/contacto">Contactanos</a>
          </div>
        </div>
      </div>
      <div
        className="container stamp"
        style={{
          padding: "22px 6% 40px",
          borderTop: "1px solid rgba(253,252,248,0.15)",
          fontSize: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>© {new Date().getFullYear()} Joyería Levin</span>
        <span>Precios y disponibilidad a consultar</span>
      </div>
    </footer>
  );
}
