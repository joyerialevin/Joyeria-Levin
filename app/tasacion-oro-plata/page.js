import TasacionProcesoPasos from "../../components/TasacionProcesoPasos";

const NUMERO_WHATSAPP = "5493434728312";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
const LINK_MAPS = "https://www.google.com/maps/search/?api=1&query=Per%C3%BA+134+Paran%C3%A1+Entre+R%C3%ADos";

const MSG_HERO = "Hola, vengo desde la página web. Quería consultar por la tasación de oro y plata.";

export const metadata = {
  title: "Tasación de oro y plata en Paraná | Joyería Levin",
  description:
    "Tasación de oro y plata sin cargo y sin turno previo, en nuestro local de Paraná. Evaluamos, pesamos y te informamos el valor de tus piezas en el momento.",
  openGraph: {
    title: "Tasación de oro y plata en Paraná | Joyería Levin",
    description:
      "Tasación de oro y plata sin cargo y sin turno previo, en nuestro local de Paraná. Más de 50 años de oficio.",
    images: ["/fotos/tasacion-balanza-oro.jpg"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "Joyería y Relojería Levin",
  image: "https://www.joyerialevin.com/fotos/tasacion-balanza-oro.jpg",
  telephone: "+5493434728312",
  url: "https://www.joyerialevin.com/tasacion-oro-plata",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perú 134",
    addressLocality: "Paraná",
    addressRegion: "Entre Ríos",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "13:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
};

const BENEFICIOS = [
  {
    titulo: "En el momento",
    texto: "La evaluación se hace durante tu visita al local.",
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3.2 2" />
      </>
    ),
  },
  {
    titulo: "Sin cargo",
    texto: "La tasación no tiene costo.",
    icono: (
      <>
        <path d="M4 12h16" />
        <path d="M7 7l-3 5 3 5" />
        <path d="M17 7l3 5-3 5" />
      </>
    ),
  },
  {
    titulo: "Sin turno previo",
    texto: "Acercate dentro de nuestro horario comercial.",
    icono: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="1" />
        <path d="M4 9.5h16" />
        <path d="M8 3v4M16 3v4" />
      </>
    ),
  },
];

const PROCESO = [
  {
    numero: "01",
    titulo: "Evaluamos y verificamos la pieza",
    texto: "Observamos sus características, comprobamos si se trata de oro o plata y verificamos su pureza.",
  },
  {
    numero: "02",
    titulo: "Pesamos",
    texto: "Realizamos el pesaje correspondiente de cada pieza.",
  },
  {
    numero: "03",
    titulo: "Te informamos su valor",
    texto: "Te damos una tasación clara y respondemos todas tus dudas sobre la evaluación.",
  },
];

const CHIPS = ["Anillos", "Alianzas", "Cadenas", "Pulseras", "Aros", "Dijes", "Monedas", "Otros objetos"];

function Eyebrow({ children, color = "var(--oro-deep)" }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12.5,
        fontWeight: 600,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function IconoWhatsApp({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

export default function TasacionOroPlataPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* 1. HERO — foto horizontal con texto superpuesto */}
      <section className="tasacion-hero-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/fotos/tasacion-balanza-oro.jpg" alt="Pesaje de joyas de oro en la balanza de Joyería Levin" />
        <div className="tasacion-hero-overlay" />
        <div className="tasacion-hero-text">
          <h1
            className="display"
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              lineHeight: 1.12,
              margin: "0 0 12px",
              color: "var(--porcelain)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
            }}
          >
            Tasación de oro y plata
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(253,252,248,0.92)",
              margin: "0 0 22px",
              maxWidth: 420,
            }}
          >
            Comprobamos el material, verificamos su pureza y pesamos cada pieza para informarte su valor.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a
              href={linkWhatsApp(MSG_HERO)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "var(--oro-deep)",
                color: "var(--porcelain)",
                padding: "14px 26px",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <IconoWhatsApp size={16} />
              Consultar por WhatsApp
            </a>
            <a
              href={LINK_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 26px",
                border: "1px solid rgba(253,252,248,0.75)",
                color: "var(--porcelain)",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </section>

      {/* 2. DIRECCIÓN Y HORARIOS */}
      <section style={{ background: "var(--sunken)", padding: "clamp(16px, 2.2vw, 22px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px 28px",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--ink)",
            textAlign: "center",
          }}
        >
          <span>Perú 134, Paraná, Entre Ríos</span>
          <span aria-hidden="true" style={{ color: "var(--sand-400)" }}>·</span>
          <span>Lunes a viernes de 9 a 13 y de 16 a 20 h</span>
          <span aria-hidden="true" style={{ color: "var(--sand-400)" }}>·</span>
          <span>Sábados de 9 a 13 h</span>
        </div>
      </section>

      {/* 3. BENEFICIOS */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(26px, 3.5vw, 40px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(20px, 3vw, 32px)",
          }}
          className="tasacion-grid-3"
        >
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--oro-deep)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                {b.icono}
              </svg>
              <div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, margin: "0 0 4px", color: "var(--ink)" }}>
                  {b.titulo}
                </h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-soft)", margin: 0 }}>{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PROCESO */}
      <section style={{ background: "var(--sunken)", padding: "clamp(32px, 4.5vw, 56px) clamp(20px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Eyebrow>El proceso</Eyebrow>
          <h2
            className="display"
            style={{ fontSize: "clamp(24px, 2.8vw, 32px)", margin: "0 0 clamp(20px, 2.8vw, 32px)", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
          >
            Cómo realizamos la tasación
          </h2>
          <TasacionProcesoPasos pasos={PROCESO} />
        </div>
      </section>

      {/* 5. QUÉ PODÉS TRAER */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(32px, 4.5vw, 56px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div className="tasacion-qpt-img" style={{ position: "relative", width: "100%", aspectRatio: "9 / 8" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "62%", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fotos/catalogo-anillos-mano.jpg" alt="Detalle de anillos y pulsera en oro" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ position: "absolute", top: "18%", right: 0, width: "52%", aspectRatio: "3 / 4", overflow: "hidden", borderRadius: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fotos/contacto-collar-detalle.jpg" alt="Detalle de collar de oro" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          </div>

          <div>
            <Eyebrow>Qué podés traer</Eyebrow>
            <h2
              className="display"
              style={{ fontSize: "clamp(22px, 2.6vw, 28px)", margin: "0 0 10px", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Piezas de oro y plata
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: "0 0 18px", maxWidth: 440 }}>
              Tasamos joyas y objetos de oro o plata, estén en uso o guardados hace años.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CHIPS.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    border: "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    color: "var(--ink)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRAYECTORIA */}
      <section style={{ background: "var(--ink)", padding: "clamp(28px, 4vw, 44px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div>
            <Eyebrow color="var(--oro-40)">Desde 1973</Eyebrow>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 1, color: "var(--oro-40)" }}>
              +50
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--line)", marginTop: 6 }}>
              años de oficio en Paraná
            </div>
          </div>
          <div>
            <h2
              className="display"
              style={{ fontSize: "clamp(22px, 2.6vw, 30px)", margin: "0 0 12px", color: "var(--porcelain)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Experiencia que genera confianza
            </h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--line)", margin: 0, maxWidth: 520 }}>
              Acompañamos a nuestros clientes con responsabilidad, atención personalizada y conocimiento del
              oficio. Esa misma trayectoria respalda cada tasación que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* 7. NOTA FINAL */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(20px, 3vw, 28px) clamp(20px, 5vw, 72px) clamp(28px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: "1px solid var(--line)", paddingTop: 20 }}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: 560,
            }}
          >
            Las consultas por WhatsApp son orientativas. Para realizar la tasación necesitamos ver y examinar la
            pieza en el local.
          </p>
        </div>
      </section>
    </div>
  );
}
