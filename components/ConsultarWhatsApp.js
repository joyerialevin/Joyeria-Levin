const NUMERO_WHATSAPP = "5493434728312";

export default function ConsultarWhatsApp({ titulo, onClick }) {
  const mensaje = `Hola! Vi en la web "${titulo}" y quería consultar por precio y disponibilidad.`;
  const href = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="stamp"
      style={{
        marginTop: 12,
        display: "block",
        width: "100%",
        padding: "10px 0",
        background: "var(--oro)",
        color: "var(--porcelain)",
        border: "none",
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      Consultar por WhatsApp
    </a>
  );
}
