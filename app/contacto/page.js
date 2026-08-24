export default function ContactoPage() {
  return (
    <section className="container" style={{ padding: "70px 0", maxWidth: 640, marginLeft: "6%" }}>
      <h2 className="display" style={{ fontSize: 28, marginBottom: 18 }}>
        Contactanos
      </h2>
      <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
        Escribinos por WhatsApp o visitá el local.
      </p>
      {/* TODO: reemplazar por los datos reales */}
      <div style={{ marginTop: 22, fontSize: 14 }}>
        <div><strong>WhatsApp:</strong> a definir</div>
        <div><strong>Instagram:</strong> @joyerialevin</div>
        <div><strong>Dirección:</strong> a definir</div>
      </div>
    </section>
  );
}
