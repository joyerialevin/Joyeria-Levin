import TasacionProcesoPasos from "../../components/TasacionProcesoPasos";

const NUMERO_WHATSAPP = "5493434728312";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;
const LINK_MAPS = "https://www.google.com/maps/search/?api=1&query=Per%C3%BA+134+Paran%C3%A1+Entre+R%C3%ADos";

const MSG_HERO = "Hola, vengo desde la página web. Quería consultar por un grabado personalizado.";
const MSG_MATERIALES = "Hola, vengo desde la página web. Quería consultar por un grabado personalizado (oro o plata).";

export const metadata = {
  title: "Grabados personalizados en Paraná | Joyería Levin",
  description:
    "Grabamos nombres, iniciales, fechas y símbolos en oro y plata, sobre pulseras, anillos, dijes, relojes y otras piezas. Consultá disponibilidad y presupuesto por WhatsApp.",
  openGraph: {
    title: "Grabados personalizados en Paraná | Joyería Levin",
    description: "Personalizá una pieza especial o dale un significado único a una joya que ya tenés.",
    images: ["/fotos/grabados-anillo-inicial-m.jpg"],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "Joyería y Relojería Levin",
  image: "https://www.joyerialevin.com/fotos/grabados-anillo-inicial-m.jpg",
  telephone: "+5493434728312",
  url: "https://www.joyerialevin.com/grabados-personalizados",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Perú 134",
    addressLocality: "Paraná",
    addressRegion: "Entre Ríos",
    addressCountry: "AR",
  },
};

const QUE_GRABAR = [
  {
    titulo: "Nombres",
    icono: <path d="M4 16c1.5-5 3-7 5-7s1.5 5 3.5 5 2-6 4-6 2.5 4 4.5 4" />,
  },
  {
    titulo: "Iniciales",
    icono: (
      <>
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </>
    ),
  },
  {
    titulo: "Fechas",
    icono: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="1" />
        <path d="M4 9.5h16" />
        <path d="M8 3v4M16 3v4" />
      </>
    ),
  },
  {
    titulo: "Símbolos y otros diseños",
    icono: <path d="M12 3l1.8 5.6L19 10.5l-5.2 1.9L12 18l-1.8-5.6L5 10.5l5.2-1.9z" />,
  },
];

const QUE_PIEZAS = ["Pulseras", "Anillos", "Dijes", "Relojes", "Otras piezas"];

const MATERIALES = [
  { titulo: "Oro", color: "var(--oro)" },
  { titulo: "Plata", color: "var(--svc-text-secondary)" },
];

const PROCESO = [
  {
    numero: "01",
    titulo: "Elegí la pieza",
    texto: "Buscá en nuestra joyería la pieza que más te guste.",
  },
  {
    numero: "02",
    titulo: "Definí el grabado",
    texto: "Elegí qué querés grabar y la tipografía que preferís.",
  },
  {
    numero: "03",
    titulo: "Consultanos",
    texto: "Escribinos por WhatsApp para confirmar el diseño, el presupuesto y el tiempo de entrega.",
  },
];

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

export default function GrabadosPersonalizadosPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* Hero */}
      <section className="svc-hero svc-hero--tall">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/grabados-anillo-inicial-m.jpg"
          alt="Anillo en oro y plata con la inicial M grabada, sostenido en la mano"
          className="svc-hero-img"
          style={{ objectPosition: "62% 42%" }}
        />
        <div className="svc-hero-overlay" />
        <div className="svc-hero-content">
          <div className="svc-container">
            <Eyebrow>Grabados personalizados</Eyebrow>
            <h1 className="svc-h1" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
              Piezas hechas para vos
            </h1>
            <p className="svc-lead" style={{ color: "var(--line)", maxWidth: 560 }}>
              Personalizá una pieza especial o dale un significado único a una joya que ya tenés.
            </p>
            <div className="svc-btn-row">
              <a href={linkWhatsApp(MSG_HERO)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
                <IconoWhatsApp />
                Consultar por WhatsApp
              </a>
              <a href={LINK_MAPS} target="_blank" rel="noopener noreferrer" className="svc-btn-secondary-dark">
                Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Qué podés grabar */}
      <section className="svc-section-sm" style={{ background: "var(--porcelain)" }}>
        <div className="svc-container">
          <Eyebrow color="var(--svc-text-secondary)">Personalización</Eyebrow>
          <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
            ¿Qué podés grabar?
          </h2>
          <div className="svc-grid-4">
            {QUE_GRABAR.map((item) => (
              <div key={item.titulo} className="svc-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {item.icono}
                </svg>
                <h3 className="svc-card-title" style={{ color: "var(--ink)", margin: 0 }}>
                  {item.titulo}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué piezas grabamos */}
      <section className="svc-section-sm" style={{ background: "var(--sunken)" }}>
        <div className="svc-container svc-grid-2">
          <div>
            <Eyebrow color="var(--svc-text-secondary)">Qué piezas grabamos</Eyebrow>
            <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
              Para usar todos los días
            </h2>
            <p className="svc-body" style={{ color: "var(--svc-text-secondary)", maxWidth: 440, marginBottom: 20 }}>
              Grabamos sobre estas piezas, en oro o plata.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {QUE_PIEZAS.map((p) => (
                <span
                  key={p}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 999,
                    background: "var(--porcelain)",
                    border: "1px solid var(--line)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13.5,
                    color: "var(--ink)",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", width: "100%", aspectRatio: "3 / 2", overflow: "hidden", borderRadius: 4 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/grabados-esclava-iniciales.jpg"
              alt="Esclava de plata con las iniciales S y O grabadas en los extremos"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Materiales */}
      <section className="svc-section-sm" style={{ background: "var(--porcelain)" }}>
        <div className="svc-container">
          <Eyebrow color="var(--svc-text-secondary)">Materiales</Eyebrow>
          <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
            ¿Sobre qué materiales trabajamos?
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
            {MATERIALES.map((m) => (
              <div
                key={m.titulo}
                className="svc-card"
                style={{ flex: "1 1 220px", display: "flex", alignItems: "center", gap: 14 }}
              >
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: m.color, flexShrink: 0 }} aria-hidden="true" />
                <h3 className="svc-card-title" style={{ color: "var(--ink)", margin: 0 }}>
                  {m.titulo}
                </h3>
              </div>
            ))}
          </div>
          <p className="svc-body svc-prose" style={{ color: "var(--svc-text-secondary)", marginBottom: 28 }}>
            Podés elegir la tipografía que más te guste. La posibilidad de realizar cada diseño dependerá del
            tamaño, la forma y el espacio disponible en la pieza.
          </p>
          <a href={linkWhatsApp(MSG_MATERIALES)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
            <IconoWhatsApp />
            Consultar por WhatsApp
          </a>
        </div>
      </section>

      {/* Cómo solicitar tu grabado */}
      <section className="svc-section-sm" style={{ background: "var(--sunken)" }}>
        <div className="svc-container">
          <Eyebrow color="var(--svc-text-secondary)">El proceso</Eyebrow>
          <h2 className="svc-h2" style={{ color: "var(--ink)" }}>
            Cómo solicitar tu grabado
          </h2>
          <TasacionProcesoPasos pasos={PROCESO} />

          <div className="svc-card" style={{ marginTop: 32 }}>
            <h3 className="svc-card-title" style={{ color: "var(--ink)" }}>
              ¿Ya tenés una pieza?
            </h3>
            <p className="svc-body" style={{ color: "var(--svc-text-secondary)", margin: "0 0 20px" }}>
              También podés traer una pieza que ya tengas. La evaluaremos y, antes de comenzar, te informaremos
              si es posible realizar el grabado, cuál es el presupuesto y cuánto tiempo llevará.
            </p>
            <a href={LINK_MAPS} target="_blank" rel="noopener noreferrer" className="svc-btn-secondary">
              Ver ubicación
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
