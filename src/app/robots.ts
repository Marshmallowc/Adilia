import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/", // Block search crawlers from hitting the lead capture serverless API
    },
    sitemap: "https://www.cust.net.cn/sitemap.xml",
  };
}
