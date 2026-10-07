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
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M6 18L18 6" />
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

function Eyebrow({ children, color = "var(--line)" }) {
  return (
    <div className="svc-eyebrow" style={{ margin: "0 0 12px", color }}>
      {children}
    </div>
  );
}

function IconoWhatsApp({ size = 16 }) {
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

      {/* Hero */}
      <section className="svc-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/tasacion-balanza-oro.jpg"
          alt="Pesaje de joyas de oro en la balanza de Joyería Levin"
          className="svc-hero-img"
          style={{ objectPosition: "62% 48%" }}
        />
        <div className="svc-hero-overlay" />
        <div className="svc-hero-content">
          <div className="svc-container">
            <Eyebrow>Servicio de tasación</Eyebrow>
            <h1 className="svc-h1" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
              Tasación de oro y plata
            </h1>
            <p className="svc-lead" style={{ color: "var(--line)", maxWidth: 560 }}>
              Comprobamos el material, verificamos su pureza y pesamos cada pieza para informarte su valor.
            </p>
            <div className="svc-btn-row">
              <a href={linkWhatsApp(MSG_HERO)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
                <IconoWhatsApp />
                Consultar por WhatsApp
              </a>
              <a href={LINK_MAPS} target="_blank" rel="noopener noreferrer" className="svc-btn-secondary-dark">
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dirección y horarios */}
      <section style={{ background: "var(--sunken)", padding: "16px 0" }}>
        <div
          className="svc-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px 24px",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--ink)",
            textAlign: "center",
          }}
        >
          <span>Perú 134, Paraná, Entre Ríos</span>
          <span aria-hidden="true" style={{ color: "var(--line)" }}>·</span>
          <span>Lunes a viernes de 9 a 13 y de 16 a 20 h</span>
          <span aria-hidden="true" style={{ color: "var(--line)" }}>·</span>
          <span>Sábados de 9 a 13 h</span>
        </div>
      </section>

      {/* Beneficios */}
      <section className="svc-section-sm" style={{ background: "var(--porcelain)" }}>
        <div className="svc-container svc-grid-3-auto" style={{ justifyContent: "center" }}>
          {BENEFICIOS.map((b) => (
            <div key={b.titulo} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                {b.icono}
              </svg>
              <div style={{ maxWidth: 240 }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, margin: "0 0 4px", color: "var(--ink)" }}>
                  {b.titulo}
                </h3>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--svc-text-secondary)", margin: 0 }}>{b.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section className="svc-section-sm" style={{ background: "var(--sunken)" }}>
        <div className="svc-container">
          <Eyebrow color="var(--svc-text-secondary)">El proceso</Eyebrow>
          <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
            Cómo realizamos la tasación
          </h2>
          <TasacionProcesoPasos pasos={PROCESO} />
        </div>
      </section>

      {/* Piezas de oro y plata */}
      <section className="svc-section-sm" style={{ background: "var(--porcelain)" }}>
        <div className="svc-container svc-grid-2">
          <div>
            <Eyebrow color="var(--svc-text-secondary)">Qué podés traer</Eyebrow>
            <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
              Piezas de oro y plata
            </h2>
            <p className="svc-body" style={{ color: "var(--svc-text-secondary)", maxWidth: 440, marginBottom: 20 }}>
              Tasamos joyas y objetos de oro o plata, estén en uso o guardados hace años.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CHIPS.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    background: "var(--sunken)",
                    border: "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13.5,
                    color: "var(--ink)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden", borderRadius: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/tasacion-piezas-oro-plata.jpg"
              alt="Piezas de oro y plata para tasación en Joyería Levin"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Trayectoria */}
      <section className="svc-section" style={{ background: "var(--ink)" }}>
        <div className="svc-container svc-grid-2" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
          <div>
            <Eyebrow color="var(--svc-oro-pale-2)">Desde 1973</Eyebrow>
            <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "clamp(48px, 6.5vw, 84px)", lineHeight: 1, color: "var(--svc-oro-pale-2)" }}>
              +50
            </div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--line)", marginTop: 6 }}>
              años de oficio en Paraná
            </div>
          </div>
          <div>
            <h2 className="svc-h2" style={{ color: "var(--porcelain)" }}>
              Experiencia que genera confianza
            </h2>
            <p className="svc-body" style={{ color: "var(--line)", maxWidth: 520 }}>
              Acompañamos a nuestros clientes con responsabilidad, atención personalizada y conocimiento del
              oficio. Esa misma trayectoria respalda cada tasación que hacemos.
            </p>
          </div>
        </div>
      </section>

      {/* Nota final */}
      <section style={{ background: "var(--porcelain)", padding: "28px 0 40px" }}>
        <div className="svc-container" style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
          <p className="svc-caption svc-prose" style={{ color: "var(--svc-text-secondary)" }}>
            Las consultas por WhatsApp son orientativas. Para realizar la tasación necesitamos ver y examinar la
            pieza en el local.
          </p>
        </div>
      </section>
    </div>
  );
}
