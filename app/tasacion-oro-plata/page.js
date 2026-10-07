const NUMERO_WHATSAPP = "5493434728312";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
const LINK_MAPS = "https://www.google.com/maps/search/?api=1&query=Per%C3%BA+134+Paran%C3%A1+Entre+R%C3%ADos";

const MSG_HERO = "Hola, vengo desde la página web. Quería consultar por la tasación de oro y plata.";
const MSG_VISITANOS = "Hola, vengo desde la página web. Quería consultar por la tasación de oro y plata antes de acercarme.";

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
  {
    titulo: "Atención personalizada",
    texto: "Cada pieza se evalúa de forma individual, con el cuidado que merece.",
    icono: (
      <>
        <circle cx="12" cy="8.5" r="3.2" />
        <path d="M5.5 20c1-3.6 3.8-5.5 6.5-5.5s5.5 1.9 6.5 5.5" />
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
        marginBottom: 16,
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

      {/* 1. HERO */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(48px, 7vw, 96px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div>
            <Eyebrow>Servicio · Tasación</Eyebrow>
            <h1
              className="display"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                lineHeight: 1.12,
                margin: "0 0 16px",
                color: "var(--ink)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
              }}
            >
              Tasación de oro y plata
            </h1>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 19,
                lineHeight: 1.5,
                color: "var(--ink-soft)",
                margin: "0 0 20px",
              }}
            >
              Conocé el valor de tus piezas, con la claridad de siempre.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 36px", maxWidth: 480 }}>
              Comprobamos el material, verificamos su pureza y pesamos cada pieza para darte un valor preciso y
              sin compromiso. En el local, en el momento y sin cargo.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
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
                  padding: "16px 30px",
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <IconoWhatsApp />
                Consultar por WhatsApp
              </a>
              <a
                href={LINK_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "16px 30px",
                  border: "1px solid var(--ink)",
                  color: "var(--ink)",
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Cómo llegar
              </a>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4 / 5", overflow: "hidden", borderRadius: 2 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fotos/tasacion-balanza-oro.jpg"
                alt="Pesaje de joyas de oro en la balanza de Joyería Levin"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center", display: "block" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 20,
                bottom: 20,
                background: "var(--porcelain)",
                padding: "12px 20px",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
                fontSize: 12.5,
                letterSpacing: "0.04em",
                color: "var(--ink)",
              }}
            >
              1973 · Más de 50 años en Paraná
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENEFICIOS */}
      <section style={{ background: "var(--sunken)", padding: "clamp(40px, 5vw, 64px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(20px, 3vw, 32px)",
          }}
          className="tasacion-grid-4"
        >
          {BENEFICIOS.map((b) => (
            <div key={b.titulo}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--oro-deep)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 14 }} aria-hidden="true">
                {b.icono}
              </svg>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, margin: "0 0 8px", color: "var(--ink)" }}>
                {b.titulo}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROCESO */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(48px, 6vw, 88px) clamp(20px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Eyebrow>El proceso</Eyebrow>
          <h2
            className="display"
            style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 clamp(32px, 4vw, 52px)", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
          >
            Cómo realizamos la tasación
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(24px, 3vw, 40px)" }} className="tasacion-grid-3">
            {PROCESO.map((p) => (
              <div key={p.numero} style={{ borderTop: "2px solid var(--ink)", paddingTop: 20 }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 40,
                    lineHeight: 1,
                    color: "var(--oro)",
                    marginBottom: 16,
                  }}
                >
                  {p.numero}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, margin: "0 0 10px", color: "var(--ink)" }}>
                  {p.titulo}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUÉ PODÉS TRAER */}
      <section style={{ background: "var(--sunken)", padding: "clamp(48px, 6vw, 88px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div className="tasacion-qpt-img" style={{ position: "relative", height: "clamp(320px, 32vw, 440px)" }}>
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
              style={{ fontSize: "clamp(24px, 2.8vw, 32px)", margin: "0 0 16px", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Piezas de oro y plata
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 26px", maxWidth: 440 }}>
              Tasamos joyas y objetos de oro o plata, estén en uso o guardados hace años.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {CHIPS.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 999,
                    border: "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
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

      {/* 5. TRAYECTORIA */}
      <section style={{ background: "var(--ink)", padding: "clamp(48px, 6vw, 88px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div>
            <Eyebrow color="var(--oro-40)">Desde 1973</Eyebrow>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(64px, 8vw, 108px)", lineHeight: 1, color: "var(--oro-40)" }}>
              +50
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--line)", marginTop: 8 }}>
              años de oficio en Paraná
            </div>
          </div>
          <div>
            <h2
              className="display"
              style={{ fontSize: "clamp(24px, 2.8vw, 34px)", margin: "0 0 18px", color: "var(--porcelain)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Experiencia que genera confianza
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--line)", margin: 0, maxWidth: 520 }}>
              Acompañamos a nuestros clientes con responsabilidad, atención personalizada y conocimiento del
              oficio. Esa misma trayectoria respalda cada tasación que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* 6. VISITANOS */}
      <section style={{ background: "var(--porcelain)", padding: "clamp(48px, 6vw, 88px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
          className="tasacion-grid-2"
        >
          <div>
            <Eyebrow>Visitanos</Eyebrow>
            <h2
              className="display"
              style={{ fontSize: "clamp(24px, 2.8vw, 34px)", margin: "0 0 16px", color: "var(--ink)", fontFamily: "var(--font-sans)", fontWeight: 700 }}
            >
              Acercate con tus piezas
            </h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "var(--ink-soft)", margin: "0 0 28px", maxWidth: 440 }}>
              La tasación se realiza personalmente en nuestro local, sin turno previo y dentro del horario
              comercial.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <a
                href={linkWhatsApp(MSG_VISITANOS)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--oro-deep)",
                  color: "var(--porcelain)",
                  padding: "15px 28px",
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <IconoWhatsApp />
                Consultar por WhatsApp
              </a>
              <a
                href={LINK_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "15px 28px",
                  border: "1px solid var(--ink)",
                  color: "var(--ink)",
                  borderRadius: 2,
                  fontFamily: "var(--font-sans)",
                  fontSize: 13.5,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Ver ubicación
              </a>
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--line)",
              borderRadius: 2,
              padding: "clamp(28px, 3vw, 40px)",
            }}
          >
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--oro-deep)", marginBottom: 10 }}>
              Dirección
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--ink)", margin: "0 0 28px" }}>
              Perú 134, Paraná, Entre Ríos
              <br />
              Joyería y Relojería Levin
            </p>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--oro-deep)", marginBottom: 10 }}>
              Horarios
            </div>
            <p style={{ fontSize: 15.5, lineHeight: 1.8, color: "var(--ink)", margin: 0 }}>
              Lunes a viernes 9 a 13 · 16 a 20 h
              <br />
              Sábados 9 a 13 h
              <br />
              Domingos cerrado
            </p>
          </div>
        </div>
      </section>

      {/* 7. NOTA FINAL */}
      <section style={{ background: "var(--porcelain)", padding: "0 clamp(20px, 5vw, 72px) clamp(48px, 6vw, 72px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", borderTop: "1px solid var(--line)", paddingTop: 24 }}>
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
            Las consultas por WhatsApp son orientativas. Para dar una tasación necesitamos ver y examinar la
            pieza en el local.
          </p>
        </div>
      </section>
    </div>
  );
}
