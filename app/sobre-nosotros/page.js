const HITOS = [
  {
    anio: "1973",
    titulo: "El taller donde empezó todo",
    texto:
      "David Levin llegó a Paraná con años de oficio como orfebre y abrió un pequeño taller dedicado a restaurar y fabricar piezas a mano. No había vitrinas ni ventas: solo trabajo artesanal, en el mismo lugar donde la joyería sigue funcionando hoy.",
    foto: { src: "/fotos/sobre-hito-1973.jpg", alt: "Trabajo de orfebrería sobre el mostrador" },
  },
  {
    anio: "1973–1986",
    titulo: "El joyero de referencia",
    texto:
      "David se ganó fama entre sus colegas: muchos clientes se quedaban tardes enteras observándolo trabajar. Su esposa Clara lo acompañó en cada jornada. Fueron años exigentes —el local llegó a dividirse en dos para sostener el negocio— pero la dedicación nunca faltó.",
  },
  {
    anio: "1986–1991",
    titulo: "Clara y Ricardo continúan",
    texto:
      "David falleció en 1986, a los 59 años. Clara siguió al frente del negocio mientras Ricardo, su hijo, aprendía el oficio con el apoyo de otros colegas. Sin la misma formación en orfebrería, empezaron a orientar el comercio hacia la venta de relojes y joyas.",
    foto: { src: "/fotos/sobre-hito-vitrina.jpg", alt: "Vitrina de joyas y relojes" },
  },
  {
    anio: "1991–1992",
    titulo: "Un nuevo local, una nueva etapa",
    texto:
      "Ricardo asumió por completo la conducción del negocio. Al año siguiente conoció a Nanci —hoy su esposa— y juntos reformaron y unificaron el local, que volvió a crecer con rapidez incorporando productos modernos y exclusivos para la ciudad.",
  },
  {
    anio: "Hoy",
    titulo: "Adriana y Débora, la cara del local",
    texto:
      "Tercera generación atendiendo detrás del mismo mostrador, en Perú 134, con la misma dedicación de siempre.",
    foto: { src: "/fotos/sobre-hito-hoy.jpg", alt: "Asesoramiento sobre una pieza" },
  },
];

const VALORES = [
  { nombre: "Confianza", texto: "Clientes que vuelven desde hace tres generaciones." },
  { nombre: "Honestidad", texto: "Decimos qué conviene y qué no, siempre." },
  { nombre: "Seguridad", texto: "Materiales verificados y trabajo en taller propio." },
  { nombre: "Garantía", texto: "Garantía escrita y service sobre lo que vendemos." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section
        className="container"
        style={{
          padding: "80px 6% 20px",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 18 }}>
            Sobre nosotros — desde 1973
          </div>
          <h1 className="display" style={{ fontSize: 44, lineHeight: 1.12, margin: "0 0 22px" }}>
            50 años de historia, familia y confianza.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
            Lo que hoy es Joyería Levin nació en 1973 como un pequeño taller de orfebrería, levantado a puro
            oficio. Medio siglo después, sigue siendo un negocio de familia en el mismo lugar de Paraná.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fotos/sobre-hero.jpg"
          alt="Joyería Levin"
          style={{
            width: "100%",
            maxWidth: 340,
            aspectRatio: "3 / 4",
            objectFit: "cover",
            objectPosition: "50% 18%",
            display: "block",
            borderRadius: "var(--radius-sm)",
            marginLeft: "auto",
          }}
        />
      </section>

      <section className="container" style={{ padding: "56px 6% 70px" }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 30 }}>
          Hitos
        </div>
        <div style={{ maxWidth: 1120 }}>
          {HITOS.map((h) => (
            <div
              key={h.anio}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: 32,
                padding: "36px 0",
                borderTop: "1px solid var(--line)",
              }}
            >
              <div className="display" style={{ fontSize: 28, color: "var(--oro)" }}>
                {h.anio}
              </div>
              <div
                style={
                  h.foto
                    ? { display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 32, alignItems: "center" }
                    : undefined
                }
              >
                <div>
                  <h3 className="stamp" style={{ fontSize: 12, color: "var(--ink)", marginBottom: 10 }}>
                    {h.titulo}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>{h.texto}</p>
                </div>
                {h.foto && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={h.foto.src}
                    alt={h.foto.alt}
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--ink)" }}>
        <div className="container" style={{ padding: "80px 6%", maxWidth: 760, textAlign: "center" }}>
          <p
            className="display"
            style={{ fontSize: 32, lineHeight: 1.35, color: "var(--porcelain)", margin: "0 0 22px" }}
          >
            "Desde la época de mi padre, los valores de fondo no cambiaron."
          </p>
          <div className="stamp" style={{ color: "var(--text-inverse-soft)", fontWeight: 300 }}>
            Ricardo Levin
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "70px 6%" }}>
        <div className="stamp" style={{ color: "var(--oro-deep)", marginBottom: 30 }}>
          Nuestros valores
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {VALORES.map((v) => (
            <div key={v.nombre}>
              <div style={{ width: 24, height: 1, background: "var(--oro)", marginBottom: 14 }} />
              <h3 className="stamp" style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 8 }}>
                {v.nombre}
              </h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)", margin: 0 }}>{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--ink)" }}>
        <div
          className="container"
          style={{
            padding: 0,
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "stretch",
          }}
        >
          <div style={{ position: "relative", minHeight: 420 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/fotos/sobre-taller.jpg"
              alt="Service técnico de relojería en el taller"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 420,
                objectFit: "cover",
                display: "block",
                position: "absolute",
                inset: 0,
              }}
            />
          </div>
          <div style={{ padding: "72px 6%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div className="stamp" style={{ color: "var(--text-inverse-soft)", marginBottom: 20, fontWeight: 300 }}>
              El taller, hoy
            </div>
            <h2
              className="display"
              style={{ fontSize: 36, lineHeight: 1.15, margin: "0 0 20px", color: "var(--porcelain)" }}
            >
              El oficio no se fue a ningún lado.
            </h2>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--text-inverse-soft)",
                margin: "0 0 32px",
                maxWidth: "42ch",
              }}
            >
              Pilas, mallas, ajuste de movimientos, arreglos, grabados y tasación. El mismo banco de trabajo que en
              1973.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
              <a
                href="https://wa.me/5493434728312"
                target="_blank"
                rel="noopener noreferrer"
                className="stamp"
                style={{
                  color: "var(--porcelain)",
                  background: "var(--oro)",
                  padding: "15px 30px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Consultar por WhatsApp
              </a>
              <a
                href="/contacto"
                className="stamp"
                style={{
                  color: "var(--porcelain)",
                  borderBottom: "1px solid rgba(253,252,248,0.4)",
                  paddingBottom: 4,
                  fontWeight: 400,
                }}
              >
                Ver en el local
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
