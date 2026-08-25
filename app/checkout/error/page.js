export default function ErrorPage() {
  return (
    <section className="container" style={{ padding: "90px 0", textAlign: "center" }}>
      <h2 className="display" style={{ fontSize: 26, marginBottom: 12 }}>
        Hubo un problema con el pago
      </h2>
      <p style={{ color: "var(--text-inverse-soft)" }}>
        No se pudo procesar el pago. Podés intentar de nuevo desde el catálogo.
      </p>
    </section>
  );
}
