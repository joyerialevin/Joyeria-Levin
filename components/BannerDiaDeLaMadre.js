import Link from "next/link";

const ACCESOS = [
  { titulo: "JOYAS", subtitulo: "Oro 18K · Plata 925 · Swarovski" },
  { titulo: "RELOJES", subtitulo: "Opciones para todos los estilos" },
  { titulo: "PERSONALIZADOS", subtitulo: "Nombres · Iniciales · Fechas" },
];

// Accesos rápidos de la campaña Día de la Madre, debajo del hero. El
// contenido principal (título, texto, foto y CTA) ahora vive en el
// slide del carrusel (ver HomeHeroCarousel.js) — este bloque solo
// aporta los 3 atajos por categoría, que no se repiten en el hero.
// Sacar junto con el slide de HomeHeroCarousel.js después del 18/10
// — junto con el ítem "Especial Mamá ♡" del menú en Header.js y
// MobileNav.js.
export default function BannerDiaDeLaMadre() {
  return (
    <section style={{ background: "var(--porcelain-dim)" }}>
      <div className="container">
        <div className="banner-dia-madre-accesos" style={{ display: "flex", gap: 16, paddingTop: 32, paddingBottom: 28 }}>
          {ACCESOS.map((a) => (
            <Link
              key={a.titulo}
              href="/regalos-dia-de-la-madre"
              className="banner-dia-madre-acceso"
              style={{
                flex: 1,
                minWidth: 200,
                padding: "18px 20px",
                background: "var(--card-bg)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
              }}
            >
              <div className="stamp" style={{ color: "var(--ink)", marginBottom: 6 }}>
                {a.titulo}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{a.subtitulo}</div>
            </Link>
          ))}
        </div>
        <div className="stamp" style={{ fontSize: 11.5, color: "var(--ink-soft)", paddingBottom: 48 }}>
          3 cuotas sin interés · 10% OFF transferencia y efectivo · Retiro en nuestro local
        </div>
      </div>
    </section>
  );
}
