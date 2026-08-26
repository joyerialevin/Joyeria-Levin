export default function PendientePage() {
  return (
    <section className="container" style={{ padding: "90px 0", textAlign: "center" }}>
      <h2 className="display" style={{ fontSize: 26, marginBottom: 12 }}>
        Pago en revisión
      </h2>
      <p style={{ color: "var(--ink-soft)" }}>
        Tu pago está pendiente de confirmación. Te avisamos apenas se acredite.
      </p>
    </section>
  );
}
