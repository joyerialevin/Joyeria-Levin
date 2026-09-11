import ServiceProcesoPasos from "../../components/ServiceProcesoPasos";

const NUMERO_WHATSAPP = "5493434728312";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;

const MSG_HERO = "Hola, vengo desde la página web. Quería saber más sobre el servicio técnico de relojería.";
const MSG_CONTACTO = "Hola, vengo desde la página web. No sé qué servicio necesita mi reloj y quería que me orienten.";

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
    tinte: true,
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

function Eyebrow({ texto, lineColor, textColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
      <span style={{ width: 34, height: 1, background: lineColor }} />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: 13,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: textColor,
        }}
      >
        {texto}
      </span>
    </div>
  );
}

export default function ServiceRelojeriaPage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          minHeight: "min(88vh, 820px)",
          display: "flex",
          alignItems: "flex-end",
          padding: "clamp(56px, 8vw, 110px) clamp(20px, 5vw, 72px) clamp(40px, 5vw, 68px)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/service-tecnico-hero.jpg"
          alt="Relojera trabajando en el taller de Joyería Levin"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 35%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(38,38,31,0.58) 0%, rgba(38,38,31,0.28) 38%, rgba(38,38,31,0.86) 100%)",
          }}
        />
        <div style={{ position: "relative", maxWidth: 1360, margin: "0 auto", width: "100%" }}>
          <Eyebrow texto="Servicio técnico de relojería" lineColor="var(--oro-40)" textColor="var(--line)" />
          <h1
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(38px, 5.6vw, 72px)",
              lineHeight: 1.06,
              letterSpacing: "-0.01em",
              color: "var(--porcelain)",
              margin: "0 0 22px",
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            Cuidamos tu reloj.
            <br />
            <span style={{ fontWeight: 300, color: "var(--oro-40)" }}>Cuidamos su historia.</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(17px, 1.4vw, 20px)",
              lineHeight: 1.6,
              color: "var(--line)",
              maxWidth: "44ch",
              margin: "0 0 34px",
            }}
          >
            Revisamos cada pieza con detalle, te explicamos qué necesita y te la devolvemos funcionando como debe.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 30px", marginBottom: 34 }}>
            <a
              href={linkWhatsApp(MSG_HERO)}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "17px 32px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <IconoWhatsApp />
              Consultar por WhatsApp
            </a>
            <a
              href="#proceso"
              className="svc-secondary-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                paddingBottom: 6,
              }}
            >
              Conocé cómo trabajamos
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 34px", fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--line)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--oro-40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 12.5l2.5 2.5 4.5-5" />
              </svg>
              Presupuesto antes de empezar
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--oro-40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
              </svg>
              Avanzamos con tu aprobación
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--oro-40)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5V12l3 2" />
              </svg>
              Muchos trabajos se resuelven en el momento
            </span>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section style={{ background: "var(--oro)", padding: "clamp(52px, 7vw, 100px) clamp(20px, 5vw, 72px)" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(22px, 4vw, 68px)",
              alignItems: "end",
              marginBottom: "clamp(32px, 4vw, 56px)",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Eyebrow texto="Nuestros servicios" lineColor="var(--oro-40)" textColor="var(--line)" />
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3.8vw, 50px)",
                  lineHeight: 1.1,
                  margin: 0,
                  color: "var(--porcelain)",
                  textWrap: "balance",
                }}
              >
                Todo lo que tu reloj necesita
              </h2>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--line)", maxWidth: "44ch", margin: 0 }}>
              Desde un cambio de pila hasta una reparación completa. Trabajamos con relojes de todas las marcas que
              vendemos y con los que ya son parte de tu historia.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "clamp(14px, 1.8vw, 24px)" }}>
            {SERVICIOS.map((s) => (
              <article
                key={s.numero}
                className={s.destacada ? "svc-card-dark" : s.tinte ? "svc-card-tint" : "svc-card"}
                style={{
                  borderRadius: "var(--radius-sm)",
                  padding: "clamp(28px, 3vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <span
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: "50%",
                      background: s.destacada ? "rgba(253,252,248,0.08)" : "var(--porcelain)",
                      border: "1px solid var(--oro-40)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: s.destacada ? "var(--oro-40)" : "var(--oro)",
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {s.icono}
                    </svg>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: 22,
                      letterSpacing: "0.04em",
                      color: s.destacada ? "var(--oro-40)" : "var(--sand-400)",
                    }}
                  >
                    {s.numero}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: 27,
                    lineHeight: 1.18,
                    margin: 0,
                    color: s.destacada ? "var(--porcelain)" : "var(--ink)",
                    textWrap: "balance",
                  }}
                >
                  {s.titulo}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: s.destacada ? "var(--line)" : "var(--ink-soft)", margin: 0, flex: 1 }}>
                  {s.body}
                </p>
                <a
                  href={linkWhatsApp(s.mensaje)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.destacada ? "svc-consultar-dark" : "svc-consultar"}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderTop: `1px solid ${s.destacada ? "rgba(253,252,248,0.18)" : s.tinte ? "var(--oro-40)" : "var(--line)"}`,
                    paddingTop: 16,
                  }}
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
      <section
        id="proceso"
        style={{
          background: "var(--sunken)",
          borderTop: "1px solid var(--sand-200)",
          borderBottom: "1px solid var(--sand-200)",
          padding: "clamp(48px, 6vw, 96px) clamp(20px, 5vw, 72px)",
        }}
      >
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(22px, 4vw, 68px)",
              alignItems: "end",
              marginBottom: "clamp(30px, 4vw, 52px)",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Eyebrow texto="Simple y transparente" lineColor="var(--oro)" textColor="var(--oro-80)" />
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3.8vw, 50px)",
                  lineHeight: 1.1,
                  margin: 0,
                  textWrap: "balance",
                }}
              >
                ¿Cómo trabajamos?
              </h2>
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "44ch", margin: 0 }}>
              Sabés qué necesita tu reloj, cuánto cuesta y cuándo estará listo antes de que hagamos cualquier
              trabajo.
            </p>
          </div>

          <ServiceProcesoPasos />

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              borderTop: "1px solid var(--line)",
              paddingTop: 22,
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink-soft)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--oro)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flex: "none", marginTop: 3 }} aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span>Atención en Paraná, Entre Ríos. También recibimos y enviamos relojes al resto del país.</span>
          </div>
        </div>
      </section>

      {/* Foto */}
      <section style={{ position: "relative", height: "clamp(320px, 42vw, 480px)", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/service-tecnico-reloj.jpg"
          alt="Reloj Citizen dorado puesto en la muñeca, junto a una pulsera Levin"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "48% 35%",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(0deg, rgba(38,38,31,0.62) 0%, rgba(38,38,31,0) 45%)",
          }}
        />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 clamp(20px, 5vw, 72px) clamp(20px, 3vw, 32px)" }}>
          <div style={{ maxWidth: 1360, margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 300,
                fontSize: 13,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--line)",
              }}
            >
              Cada pieza, tratada con el mismo cuidado
            </span>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section style={{ background: "var(--oro)", padding: "clamp(44px, 6vw, 92px) clamp(20px, 5vw, 72px)" }}>
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(28px, 4vw, 64px)",
            alignItems: "center",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <Eyebrow texto="Estamos para ayudarte" lineColor="var(--oro-40)" textColor="var(--line)" />
            <h2
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "clamp(30px, 3.4vw, 46px)",
                lineHeight: 1.12,
                color: "var(--porcelain)",
                margin: "0 0 18px",
                textWrap: "balance",
              }}
            >
              ¿No sabés qué servicio necesitás?
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "var(--line)", maxWidth: "46ch", margin: 0 }}>
              Contanos qué le pasa a tu reloj o mandanos una foto. Te orientamos y te decimos cómo seguir.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
            <a
              href={linkWhatsApp(MSG_CONTACTO)}
              target="_blank"
              rel="noopener noreferrer"
              className="svc-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "18px 32px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <IconoWhatsApp />
              Enviar una consulta
            </a>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 32px", fontSize: 15, lineHeight: 1.7, color: "var(--line)" }}>
              <span>Lunes a viernes de 9 a 13 y de 17 a 20.30 h</span>
              <span>Sábados de 9 a 13 h</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
