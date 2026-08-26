export default function ContactoPage() {
  return (
    <section className="container" style={{ padding: "70px 0", maxWidth: 640, marginLeft: "6%" }}>
      <h2 className="display" style={{ fontSize: 28, marginBottom: 18 }}>
        Contactanos
      </h2>
      <p style={{ color: "var(--text-inverse-soft)", lineHeight: 1.7 }}>
        Escribinos por WhatsApp o visitá el local.
      </p>
      {/* TODO: reemplazar dirección por el dato real */}
      <div style={{ marginTop: 22, fontSize: 14 }}>
        <div>
          <strong>WhatsApp:</strong>{" "}
          <a
            href="https://wa.me/5493434728312?text=Hola!%20Quer%C3%ADa%20hacer%20una%20consulta."
            target="_blank"
            rel="noopener noreferrer"
          >
            +54 9 343 472-8312
          </a>
        </div>
        <div><strong>Instagram:</strong> @joyerialevin</div>
        <div><strong>Dirección:</strong> a definir</div>
      </div>
    </section>
  );
}
