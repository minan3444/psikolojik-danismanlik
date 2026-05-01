/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, { dev }) {
    if (dev) {
      config.resolve.alias["@locator/runtime"] = "@locator/runtime";
    }
    return config;
  },
  turbopack: {}, // bunu eklemeyi unutmayın, aksi takdirde Turbopack hatası alırsınız
};

module.exports = nextConfig;