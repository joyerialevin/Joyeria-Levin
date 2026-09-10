export default function InstagramButton() {
  return (
    <a
      href="https://instagram.com/joyerialevin"
      target="_blank"
      rel="noopener noreferrer"
      className="stamp"
      style={{
        position: "fixed",
        left: 28,
        bottom: 28,
        zIndex: 150,
        background: "var(--oro)",
        color: "var(--porcelain)",
        fontSize: 12,
        padding: "15px 26px",
        borderRadius: "var(--radius-pill)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      Instagram
    </a>
  );
}
