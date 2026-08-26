const FOTOS = [
  { src: "/fotos/detalle-alianzas-mesa.jpg", alt: "Alianzas en estuche sobre la mesa" },
  { src: "/fotos/detalle-anillos-mano.jpg", alt: "Anillos puestos en mano" },
  { src: "/fotos/detalle-anillos-vitrina.jpg", alt: "Anillos en vitrina" },
  { src: "/fotos/detalle-bandeja-anillos.jpg", alt: "Bandeja de anillos" },
  { src: "/fotos/detalle-alianzas-estuche.jpg", alt: "Alianzas en estuche" },
  { src: "/fotos/detalle-aros-cadenas.jpg", alt: "Aros y cadenas puestos" },
];

export default function PhotoStrip() {
  return (
    <section style={{ padding: "8px 0 72px" }}>
      <div
        className="container"
        style={{
          padding: "0 6%",
          marginBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
          El detalle, de cerca
        </div>
        <a href="https://instagram.com/joyerialevin" target="_blank" rel="noopener noreferrer" className="stamp" style={{ color: "var(--ink-soft)", fontWeight: 300 }}>
          @joyerialevin
        </a>
      </div>
      <div
        className="scroll-row"
        style={{ padding: "0 6%", gap: 10 }}
      >
        {FOTOS.map((foto) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            style={{ width: 220, aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
          />
        ))}
      </div>
    </section>
  );
}
