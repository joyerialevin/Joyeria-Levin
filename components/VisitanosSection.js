export default function VisitanosSection() {
  return (
    <section id="visitanos" style={{ background: "rgba(130,120,56,0.16)" }}>
      <div className="container visitanos-grid" style={{ padding: "56px 6% 70px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <div
          style={{
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            border: "1px solid var(--line)",
            aspectRatio: "4 / 3",
          }}
        >
          <iframe
            title="Ubicación de Joyería Levin en el mapa"
            src="https://www.google.com/maps?q=Per%C3%BA+134,+Paran%C3%A1,+Entre+R%C3%ADos&output=embed"
            loading="lazy"
            style={{ width: "100%", height: "100%", border: 0, display: "block" }}
          />
        </div>

        <div>
          <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 18 }}>
            Visitanos
          </div>
          <h2 className="display" style={{ fontSize: 32, lineHeight: 1.15, margin: "0 0 20px" }}>
            Estamos en Perú 134, Paraná, Entre Ríos.
          </h2>
          <a
            href="https://maps.google.com/?q=Perú+134,+Paraná,+Entre+Ríos"
            target="_blank"
            rel="noopener noreferrer"
            className="stamp"
            style={{ display: "inline-block", color: "var(--ink)", borderBottom: "1px solid var(--oro)", paddingBottom: 4, marginBottom: 28 }}
          >
            Cómo llegar
          </a>
          <div className="stamp" style={{ color: "var(--oro-deep)", fontWeight: 300, marginBottom: 10 }}>
            Horarios
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink)" }}>
            Lunes a viernes 9:00–13:00 y 16:00–20:00
            <br />
            Sábados 9:00–13:00 · Domingo cerrado
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .visitanos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
