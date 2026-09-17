const NUMERO_WHATSAPP = "5493434728312";

export default function ConsultarWhatsApp({ titulo, imagenUrl, onClick, compacto }) {
  const mensaje = imagenUrl
    ? `Hola! Vi en la web "${titulo}" y quería consultar por precio y disponibilidad.\n${imagenUrl}`
    : `Hola! Vi en la web "${titulo}" y quería consultar por precio y disponibilidad.`;
  const href = `https://api.whatsapp.com/send?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="stamp"
      style={{
        marginTop: compacto ? 8 : 12,
        display: "block",
        width: "100%",
        padding: compacto ? "8px 0" : "10px 0",
        fontSize: compacto ? 11 : undefined,
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
