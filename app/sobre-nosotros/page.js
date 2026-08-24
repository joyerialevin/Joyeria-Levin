export default function SobreNosotrosPage() {
  return (
    <section className="container" style={{ padding: "70px 0", maxWidth: 640, marginLeft: "6%" }}>
      <h2 className="display" style={{ fontSize: 28, marginBottom: 18 }}>
        Sobre nosotros
      </h2>
      <p style={{ color: "var(--ink-soft)", lineHeight: 1.7 }}>
        {/* TODO: reemplazar por el texto real de la historia de la joyería */}
        Joyería Levin es un negocio familiar dedicado a la selección de
        piezas en oro y plata de calidad.
      </p>
    </section>
  );
}
