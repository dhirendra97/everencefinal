/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "everence.io" },
      { protocol: "https", hostname: "www.everence.io" },
      { protocol: "https", hostname: "images.ctfassets.net" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; frame-ancestors 'self'; upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "everence.io" }],
        destination: "https://www.everence.io/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;