import Image from "next/image";

const INFORMACION = [
  { texto: "Sobre nosotros", href: "/sobre-nosotros" },
  { texto: "Envíos" },
  { texto: "Cambios y devoluciones" },
  { texto: "Garantía y cuidados" },
  { texto: "Medios de pago" },
  { texto: "Preguntas frecuentes" },
];

const REDES = [
  {
    nombre: "WhatsApp",
    href: "https://api.whatsapp.com/send?phone=5493434728312",
    path: "M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.337-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232",
  },
  {
    nombre: "Instagram",
    href: "https://instagram.com/joyerialevin",
    path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
  },
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/joyeriayrelojerialevin",
    path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.994 0-1.303.617-1.303 1.25V8.05h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951",
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "var(--text-inverse-soft)" }}>
      <div
        className="container footer-grid"
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
            style={{ height: 110, width: "auto" }}
          />
        </div>

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Visitanos
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, margin: "0 0 16px" }}>
            <a href="https://maps.google.com/?q=Perú+134,+Paraná,+Entre+Ríos" target="_blank" rel="noopener noreferrer">
              Perú 134, Paraná, Entre Ríos.
            </a>
          </p>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Horarios
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Lunes a viernes 9:00–13:00 y 16:00–20:00
            <br />
            Sábados 9:00–13:00 · Domingo cerrado
          </p>
        </div>

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Información
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13 }}>
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

        <div>
          <div className="stamp" style={{ fontSize: 11, color: "var(--text-inverse)", marginBottom: 16 }}>
            Contacto
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {REDES.map((r) => (
              <a
                key={r.nombre}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={r.nombre}
                style={{ color: "var(--oro)", display: "block" }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d={r.path} />
                </svg>
              </a>
            ))}
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
