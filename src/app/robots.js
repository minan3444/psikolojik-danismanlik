export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/yonetim-paneli/", "/studio/", "/api/"],
      },
    ],
    sitemap: "https://www.seymainan.com/sitemap.xml",
    host: "https://www.seymainan.com",
  };
}
