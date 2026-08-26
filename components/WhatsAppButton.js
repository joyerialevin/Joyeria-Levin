const NUMERO_WHATSAPP = "5493434728312";
const MENSAJE = "Hola! Vi la web de Joyería Levin y quería hacer una consulta.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(MENSAJE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="stamp"
      style={{
        position: "fixed",
        right: 28,
        bottom: 28,
        zIndex: 150,
        background: "var(--oro)",
        color: "var(--porcelain)",
        fontSize: 12,
        padding: "15px 26px",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      WhatsApp
    </a>
  );
}
