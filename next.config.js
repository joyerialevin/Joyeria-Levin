/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" }
    ]
  },
  // La landing de regalos Día de la Madre es HTML estático servido desde
  // public/regalos-dia-de-la-madre/ — Next no resuelve /carpeta/ al
  // index.html de esa carpeta por su cuenta, hay que indicarlo a mano.
  async rewrites() {
    return [
      { source: "/regalos-dia-de-la-madre", destination: "/regalos-dia-de-la-madre/index.html" },
      { source: "/regalos-dia-de-la-madre/", destination: "/regalos-dia-de-la-madre/index.html" },
    ];
  }
};

module.exports = nextConfig;
