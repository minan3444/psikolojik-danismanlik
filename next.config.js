/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.resolve.alias["@locator/runtime"] = "@locator/runtime";
    }
    return config;
  },
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // ✅ YENİ EKLENDİ: Build zamanını environment variable olarak kaydet
  env: {
    buildTime: new Date().toISOString(),
  },
};

module.exports = nextConfig;
