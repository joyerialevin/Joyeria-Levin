// Permite expresamente el acceso a buscadores y a los crawlers de
// asistentes de IA (ChatGPT, Perplexity, Claude, etc.) — antes no
// había ningún robots.txt, así que por defecto ya estaba permitido,
// pero esto lo deja explícito y agrega el sitemap.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.joyerialevin.com/sitemap.xml",
  };
}
