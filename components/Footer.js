export default function Footer() {
  return (
    <footer
      className="stamp"
      style={{
        padding: "26px 6%",
        borderTop: "1px solid var(--line)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        fontWeight: 500,
        color: "var(--text-inverse-soft)",
        marginTop: 60,
      }}
    >
      <span>© {new Date().getFullYear()} Levin — Joyería &amp; Relojería</span>
      <span>Pagos con Mercado Pago</span>
    </footer>
  );
}
