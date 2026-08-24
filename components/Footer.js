export default function Footer() {
  return (
    <footer
      style={{
        padding: "24px 6%",
        borderTop: "1px solid var(--line)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "var(--ink-soft)",
        marginTop: 60,
      }}
    >
      <span>© {new Date().getFullYear()} Joyería Levin</span>
      <span>Pagos con Mercado Pago</span>
    </footer>
  );
}
