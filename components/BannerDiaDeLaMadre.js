import Link from "next/link";

const NUMERO_WHATSAPP = "5493434728312";
const MENSAJE_WHATSAPP = "Hola! Quería consultar por los regalos del Día de la Madre.";
const LINK_WHATSAPP = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(MENSAJE_WHATSAPP)}`;

const ACCESOS = [
  { titulo: "JOYAS", subtitulo: "Oro 18K · Plata 925 · Swarovski" },
  { titulo: "RELOJES", subtitulo: "Opciones para todos los estilos" },
  { titulo: "PERSONALIZADOS", subtitulo: "Nombres · Iniciales · Fechas" },
];

// Banner temporal de la campaña Día de la Madre, en la home.
// Sacar este componente (y su uso en app/page.js) después del
// domingo 18 de octubre — junto con el ítem "Especial Mamá ♡" del
// menú en Header.js y MobileNav.js.
export default function BannerDiaDeLaMadre() {
  return (
    <section style={{ background: "var(--porcelain-dim)" }}>
      <div
        className="container banner-dia-madre"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: 56,
          padding: "72px 6%",
        }}
      >
        <div>
          <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 16 }}>
            Día de la Madre · 18 de octubre
          </div>
          <h2
            className="display"
            style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.2, margin: "0 0 18px", color: "var(--ink)" }}
          >
            Encontrá el regalo para mamá.
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 28px", maxWidth: 440 }}>
            Joyas en oro 18K, plata 925, Swarovski, relojes y regalos personalizados.
          </p>
          <Link
            href="/regalos-dia-de-la-madre"
            className="stamp banner-dia-madre-cta"
            style={{
              display: "inline-block",
              color: "var(--porcelain)",
              background: "var(--oro)",
              padding: "16px 34px",
              borderRadius: "var(--radius-sm)",
              marginBottom: 16,
            }}
          >
            Ver especial Día de la Madre
          </Link>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", margin: 0 }}>
            ¿No sabés qué elegir? Te ayudamos en el local o por{" "}
            <a href={LINK_WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: "var(--oro-deep)" }}>
              WhatsApp
            </a>
            .
          </p>
        </div>

        <div className="banner-dia-madre-img" style={{ aspectRatio: "4 / 3", overflow: "hidden", borderRadius: "var(--radius-sm)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/regalos-dia-de-la-madre/img/post4-hijo.jpg"
            alt="Mamá e hijo abrazados, ella con joyas de Levin"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      <div className="container">
        <div className="banner-dia-madre-accesos" style={{ display: "flex", gap: 16, paddingBottom: 28 }}>
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
