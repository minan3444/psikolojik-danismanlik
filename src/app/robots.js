export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.seymainan.com/sitemap.xml",
    host: "https://www.seymainan.com",
  };
}
