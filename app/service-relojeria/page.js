import ServiceProcesoPasos from "../../components/ServiceProcesoPasos";

const NUMERO_WHATSAPP = "5493434728312";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;

const MSG_HERO = "Hola, vengo desde la página web. Quería saber más sobre el servicio técnico de relojería.";
const MSG_CONTACTO = "Hola, vengo desde la página web. No sé qué servicio necesita mi reloj y quería que me orienten.";

const BENEFICIOS_HERO = [
  {
    texto: "Presupuesto antes de empezar",
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    texto: "Avanzamos con tu aprobación",
    icono: (
      <>
        <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
      </>
    ),
  },
  {
    texto: "Muchos trabajos se resuelven en el momento",
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
];

const SERVICIOS = [
  {
    numero: "01",
    titulo: "Cambio de pila",
    body: "Reemplazo de pila con sellado y control de marcha. En la mayoría de los relojes, listo en el momento.",
    mensaje: "Hola, vengo desde la página web. Necesito un cambio de pila para mi reloj. ¿Me pueden orientar?",
    icono: (
      <>
        <rect x="2" y="8" width="15" height="9" rx="1.5" />
        <path d="M20 11v3" />
        <path d="M10.5 10l-1.8 2.6h2.6L9.5 15" />
      </>
    ),
  },
  {
    numero: "02",
    titulo: "Mallas, pernos y cierres",
    body: "Ajuste a medida, cambio de malla, reemplazo de pernos y reparación de cierres y broches.",
    mensaje: "Hola, vengo desde la página web. Quería consultar por la malla de mi reloj (ajuste, cambio, pernos o cierre).",
    icono: (
      <>
        <path d="M9.5 14.5a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 5l-1 1" />
        <path d="M14.5 9.5a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5-5l1-1" />
      </>
    ),
  },
  {
    numero: "03",
    titulo: "Revisión y reparación",
    body: "Relojes que se detienen, atrasan o se humedecieron: diagnóstico completo y presupuesto antes de intervenir.",
    mensaje: "Hola, vengo desde la página web. Mi reloj necesita una revisión. Quería consultar por un diagnóstico y presupuesto.",
    destacada: true,
    icono: (
      <>
        <path d="M4 7h9" />
        <path d="M17 7h3" />
        <circle cx="15" cy="7" r="2" />
        <path d="M20 17h-9" />
        <path d="M7 17H4" />
        <circle cx="9" cy="17" r="2" />
      </>
    ),
  },
];

function IconoWhatsApp({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

function Eyebrow({ texto, color = "var(--line)", lineColor = "var(--svc-oro-pale-1)" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
      <span style={{ width: 34, height: 1, background: lineColor }} />
      <span className="svc-eyebrow" style={{ margin: 0, color }}>
        {texto}
      </span>
    </div>
  );
}

export default function ServiceRelojeriaPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Hero */}
      <section className="svc-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/service-tecnico-hero.jpg"
          alt="Relojera trabajando en el taller de Joyería Levin"
          className="svc-hero-img"
          style={{ objectPosition: "50% 35%" }}
        />
        <div className="svc-hero-overlay" />
        <div className="svc-hero-content">
          <div className="svc-container">
            <Eyebrow texto="Servicio técnico de relojería" />
            <h1 className="svc-h1" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
              Cuidamos tu reloj.
              <br />
              <span style={{ color: "var(--svc-oro-pale-1)" }}>Cuidamos su historia.</span>
            </h1>
            <p className="svc-lead" style={{ color: "var(--line)", maxWidth: 560 }}>
              Revisamos cada pieza con detalle, te explicamos qué necesita y te la devolvemos funcionando como debe.
            </p>
            <div className="svc-btn-row">
              <a href={linkWhatsApp(MSG_HERO)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
                <IconoWhatsApp size={16} />
                Consultar por WhatsApp
              </a>
              <a href="#proceso" className="svc-btn-secondary-dark">
                Conocé cómo trabajamos
              </a>
            </div>
          </div>
        </div>
        <div className="svc-hero-benefits">
          <div className="svc-container" style={{ display: "flex", flexWrap: "nowrap", gap: 28 }}>
            {BENEFICIOS_HERO.map((b) => (
              <span key={b.texto} style={{ display: "inline-flex", alignItems: "center", gap: 9, flex: "none" }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--svc-oro-pale-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {b.icono}
                </svg>
                <span className="svc-small" style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--line)" }}>
                  {b.texto}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="svc-section" style={{ background: "var(--oro)" }}>
        <div className="svc-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "end",
              marginBottom: 40,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Eyebrow texto="Nuestros servicios" />
              <h2 className="svc-h2" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
                Todo lo que tu reloj necesita
              </h2>
            </div>
            <p className="svc-body" style={{ color: "var(--line)", maxWidth: "44ch" }}>
              Desde un cambio de pila hasta una reparación completa. Trabajamos con relojes de todas las marcas que
              vendemos y con los que ya son parte de tu historia.
            </p>
          </div>

          <div className="svc-grid-3">
            {SERVICIOS.map((s) => (
              <article
                key={s.numero}
                className={s.destacada ? "svc-card-dark" : "svc-card"}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <span
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: s.destacada ? "rgba(253,252,248,0.08)" : "var(--porcelain)",
                      border: "1px solid var(--oro)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: s.destacada ? "var(--svc-oro-pale-1)" : "var(--oro)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {s.icono}
                    </svg>
                  </span>
                  <span
                    className="svc-eyebrow"
                    style={{ margin: 0, color: s.destacada ? "var(--svc-oro-pale-1)" : "var(--oro)" }}
                  >
                    {s.numero}
                  </span>
                </div>
                <h3 className="svc-card-title" style={{ color: s.destacada ? "var(--porcelain)" : "var(--ink)" }}>
                  {s.titulo}
                </h3>
                <p className="svc-body" style={{ color: s.destacada ? "var(--line)" : "var(--svc-text-secondary)", flex: 1 }}>
                  {s.body}
                </p>
                <a
                  href={linkWhatsApp(s.mensaje)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.destacada ? "svc-consultar-dark" : "svc-consultar"}
                  style={{ borderTop: `1px solid ${s.destacada ? "rgba(253,252,248,0.18)" : "var(--line)"}`, paddingTop: 16 }}
                >
                  Consultar
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 12h12M13 6l6 6-6 6" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="svc-section" style={{ background: "var(--sunken)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="svc-container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              alignItems: "end",
              marginBottom: 40,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Eyebrow texto="Simple y transparente" color="var(--svc-text-secondary)" lineColor="var(--oro)" />
              <h2 className="svc-h2" style={{ color: "var(--ink)", textWrap: "balance" }}>
                ¿Cómo trabajamos?
              </h2>
            </div>
            <p className="svc-body" style={{ color: "var(--svc-text-secondary)", maxWidth: "44ch" }}>
              Sabés qué necesita tu reloj, cuánto cuesta y cuándo estará listo antes de que hagamos cualquier
              trabajo.
            </p>
          </div>

          <ServiceProcesoPasos />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, borderTop: "1px solid var(--line)", paddingTop: 22, marginTop: 24 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 3 }} aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="svc-small" style={{ color: "var(--svc-text-secondary)" }}>
              Atención en Paraná, Entre Ríos. También recibimos y enviamos relojes al resto del país.
            </span>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="svc-section-sm" style={{ position: "relative", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/service-tecnico-reloj.jpg"
          alt="Reloj Citizen dorado puesto en la muñeca, junto a una pulsera Levin"
          className="svc-hero-img"
          style={{ objectPosition: "48% 35%" }}
        />
        <div className="svc-hero-overlay" />
        <div className="svc-container" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center" }}>
          <div style={{ minWidth: 0 }}>
            <Eyebrow texto="Estamos para ayudarte" />
            <h2 className="svc-h2" style={{ color: "var(--porcelain)", textWrap: "balance" }}>
              ¿No sabés qué servicio necesitás?
            </h2>
            <p className="svc-body" style={{ color: "var(--line)", maxWidth: "46ch" }}>
              Contanos qué le pasa a tu reloj o mandanos una foto. Te orientamos y te decimos cómo seguir.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
            <a href={linkWhatsApp(MSG_CONTACTO)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
              <IconoWhatsApp size={16} />
              Enviar una consulta
            </a>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 28px" }}>
              <span className="svc-small" style={{ color: "var(--line)" }}>Lunes a viernes de 9 a 13 y de 16 a 20 h</span>
              <span className="svc-small" style={{ color: "var(--line)" }}>Sábados de 9 a 13 h</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
