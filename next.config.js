// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "everence.io" },
      { protocol: "https", hostname: "www.everence.io" },
      { protocol: "https", hostname: "blog.everence.io" }, // ✅ Blog images ke liye
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "www.googletagmanager.com" },
      { protocol: "https", hostname: "www.google-analytics.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
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
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; " +
              "style-src 'self' 'unsafe-inline'; " +
              // ✅ blog.everence.io yahan add kiya gaya hai
              "img-src 'self' data: blob: https://www.everence.io https://blog.everence.io https://www.google-analytics.com https://cdn-icons-png.flaticon.com https://upload.wikimedia.org; " +
              "font-src 'self' data:; " +
              "connect-src 'self' https://www.google-analytics.com https://everence.io https://api.everence.io; " +
              "frame-ancestors 'self'; " +
              "upgrade-insecure-requests;",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
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