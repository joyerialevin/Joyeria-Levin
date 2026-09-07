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
    href: "https://wa.me/5493434728312",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z M12.001 2C6.478 2 2 6.478 2 12c0 1.821.487 3.53 1.338 5L2 22l5.2-1.312A9.94 9.94 0 0 0 12 22c5.523 0 10-4.478 10-10S17.523 2 12 2Z",
  },
  {
    nombre: "Instagram",
    href: "https://instagram.com/joyerialevin",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.339 3.608 1.315.976.975 1.253 2.242 1.315 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.339 2.633-1.315 3.608-.975.976-2.242 1.253-3.608 1.315-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.339-3.608-1.315-.976-.975-1.253-2.242-1.315-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.339-2.633 1.315-3.608.975-.976 2.242-1.253 3.608-1.315C8.416 2.175 8.796 2.163 12 2.163Zm0 1.802c-3.148 0-3.501.012-4.737.069-1.024.047-1.58.218-1.949.362-.49.19-.84.418-1.208.786-.368.368-.596.717-.786 1.208-.144.37-.315.925-.362 1.949-.057 1.236-.069 1.589-.069 4.737s.012 3.501.069 4.737c.047 1.024.218 1.58.362 1.949.19.49.418.84.786 1.208.368.368.717.596 1.208.786.37.144.925.315 1.949.362 1.236.057 1.589.069 4.737.069s3.501-.012 4.737-.069c1.024-.047 1.58-.218 1.949-.362.49-.19.84-.418 1.208-.786.368-.368.596-.717.786-1.208.144-.37.315-.925.362-1.949.057-1.236.069-1.589.069-4.737s-.012-3.501-.069-4.737c-.047-1.024-.218-1.58-.362-1.949a3.25 3.25 0 0 0-.786-1.208 3.25 3.25 0 0 0-1.208-.786c-.37-.144-.925-.315-1.949-.362-1.236-.057-1.589-.069-4.737-.069Zm0 3.064a4.971 4.971 0 1 1 0 9.942 4.971 4.971 0 0 1 0-9.942Zm0 8.2a3.229 3.229 0 1 0 0-6.458 3.229 3.229 0 0 0 0 6.458Zm5.338-8.395a1.162 1.162 0 1 1-2.324 0 1.162 1.162 0 0 1 2.324 0Z",
  },
  {
    nombre: "Facebook",
    href: "https://www.facebook.com/joyeriayrelojerialevin",
    path: "M13.5 21v-7.75h2.6l.39-3.02h-2.99V8.31c0-.875.243-1.47 1.497-1.47h1.598V4.14C16.302 4.097 15.472 4 14.5 4c-2.03 0-3.42 1.239-3.42 3.514v1.714H8.5v3.02h2.58V21h2.42Z",
  },
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
