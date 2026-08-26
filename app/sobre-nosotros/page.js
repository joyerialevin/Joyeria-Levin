export default function SobreNosotrosPage() {
  return (
    <section className="container" style={{ padding: "80px 0 90px", maxWidth: 760, marginLeft: "6%" }}>
      <span className="stamp" style={{ color: "var(--ink)" }}>
        Sobre nosotros
      </span>
      <h2
        className="display"
        style={{ fontSize: 36, marginTop: 14, marginBottom: 26, textTransform: "uppercase" }}
      >
        Levin — Joyería &amp; Relojería
      </h2>
      <p className="editorial" style={{ fontSize: 19, lineHeight: 1.6, color: "var(--ink-soft)" }}>
        Una estética bien cuidada no se ve. Se siente.
      </p>

      <div style={{ marginTop: 40 }}>
        <h3 className="display" style={{ fontSize: 15, textTransform: "uppercase", marginBottom: 10 }}>
          Qué hacemos
        </h3>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>
          Seleccionamos relojes, anillos, pulseras, cadenas y aros en oro 18K y plata 925,
          junto a piezas con cristales Swarovski. Cada producto pasa por nuestro criterio
          antes de llegar al local: calidad de materiales, terminación y durabilidad.
        </p>
      </div>

      <div style={{ marginTop: 34 }}>
        <h3 className="display" style={{ fontSize: 15, textTransform: "uppercase", marginBottom: 10 }}>
          Servicios
        </h3>
        <p style={{ color: "var(--ink-soft)", lineHeight: 1.8 }}>
          Además de la venta, ofrecemos servicio de relojería (reparación y mantenimiento),
          tasación, asesoramiento personalizado para elegir un regalo y grabados a pedido.
        </p>
      </div>

      <div
        style={{
          marginTop: 40,
          paddingTop: 28,
          borderTop: "1px solid rgba(253,252,248,0.3)",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7 }}>
          {/* TODO: reemplazar por la historia real — cómo empezó Levin, quién la fundó,
              qué la distingue. Esta sección todavía no tiene el texto definitivo. */}
          Esta sección está en construcción: pronto vas a poder leer acá la historia real
          detrás de Levin.
        </p>
      </div>
    </section>
  );
}
