const NUMERO_WHATSAPP = "5493434728312";
const MSG = "Hola, vengo desde la página web. Quería consultar por grabados personalizados.";
const linkWhatsApp = (mensaje) => `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;

function IconoWhatsApp({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    </svg>
  );
}

export default function GrabadosPersonalizadosPage() {
  return (
    <section style={{ position: "relative", minHeight: "clamp(480px, 55vh, 560px)", display: "flex", alignItems: "center", background: "var(--ink)", overflow: "hidden" }}>
      {/* Detalle gráfico sutil en oliva, a modo de trazo de grabado, mientras
          no haya una fotografía real del servicio. */}
      <svg
        width="620"
        height="620"
        viewBox="0 0 620 620"
        fill="none"
        aria-hidden="true"
        style={{ position: "absolute", right: "-120px", top: "50%", transform: "translateY(-50%)", opacity: 0.16 }}
      >
        <circle cx="310" cy="310" r="300" stroke="var(--oro)" strokeWidth="1" />
        <circle cx="310" cy="310" r="246" stroke="var(--oro)" strokeWidth="1" />
        <circle cx="310" cy="310" r="192" stroke="var(--oro)" strokeWidth="1" />
        <path d="M310 10v600M10 310h600" stroke="var(--oro)" strokeWidth="1" />
      </svg>

      <div className="svc-container" style={{ position: "relative" }}>
        <div className="svc-eyebrow" style={{ color: "var(--line)" }}>Grabados personalizados</div>
        <h1 className="svc-h1" style={{ color: "var(--porcelain)" }}>Próximamente</h1>
        <p className="svc-lead" style={{ color: "var(--line)", maxWidth: 520 }}>
          Estamos preparando esta sección. Mientras tanto, escribinos por WhatsApp y te ayudamos.
        </p>
        <a href={linkWhatsApp(MSG)} target="_blank" rel="noopener noreferrer" className="svc-btn-primary">
          <IconoWhatsApp />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}
