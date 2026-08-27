const HITOS = [
  {
    anio: "1973",
    titulo: "El taller donde empezó todo",
    texto:
      "David Levin llegó a Paraná con años de oficio como orfebre y abrió un pequeño taller dedicado a restaurar y fabricar piezas a mano. No había vitrinas ni ventas: solo trabajo artesanal, en el mismo lugar donde la joyería sigue funcionando hoy.",
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
  },
  {
    anio: "1991–1992",
    titulo: "Un nuevo local, una nueva etapa",
    texto:
      "Ricardo asumió por completo la conducción del negocio. Al año siguiente conoció a Nanci —hoy su esposa— y juntos reformaron y unificaron el local, que volvió a crecer con rapidez incorporando productos modernos y exclusivos para la ciudad.",
  },
];

const VALORES = ["Confianza", "Honestidad", "Seguridad", "Garantía"];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="container" style={{ padding: "80px 6% 20px", maxWidth: 720 }}>
        <span className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300 }}>
          Sobre nosotros
        </span>
        <h1
          className="display"
          style={{ fontSize: 44, lineHeight: 1.12, margin: "18px 0 22px" }}
        >
          50 años de historia, familia y confianza.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink-soft)" }}>
          Lo que hoy es Joyería Levin nació en 1973 como un pequeño taller de orfebrería,
          levantado a puro oficio. Medio siglo después, sigue siendo un negocio de familia en
          el mismo lugar de Paraná.
        </p>
      </section>

      <section className="container" style={{ padding: "20px 6% 60px", maxWidth: 720 }}>
        {HITOS.map((h) => (
          <div
            key={h.anio}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: 24,
              padding: "32px 0",
              borderTop: "1px solid var(--line)",
            }}
          >
            <div className="display" style={{ fontSize: 30, color: "var(--oro)" }}>
              {h.anio}
            </div>
            <div>
              <h3 className="stamp" style={{ fontSize: 12, color: "var(--ink)", marginBottom: 10 }}>
                {h.titulo}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ink-soft)", margin: 0 }}>
                {h.texto}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section style={{ background: "var(--sunken)", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ padding: "60px 6%", maxWidth: 720 }}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--ink)", margin: "0 0 28px" }}>
            Hoy Adriana y Débora son la cara visible del local y reciben a cada cliente con la
            misma dedicación de siempre. Ricardo destaca que, desde la época de su padre, los
            valores de fondo no cambiaron:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 20,
            }}
          >
            {VALORES.map((v) => (
              <div key={v}>
                <div style={{ width: 24, height: 1, background: "var(--oro)", marginBottom: 12 }} />
                <div className="stamp" style={{ fontSize: 12, color: "var(--ink)" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
