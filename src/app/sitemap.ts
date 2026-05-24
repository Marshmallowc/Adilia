import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.cust.net.cn";

  // Static and dynamic pages
  const routes = [
    "",
    "/blog",
    "/blog/graduation-project-traps-2026",
    "/blog/mini-program-pricing-and-architecture",
    "/blog/llm-rag-architecture-landing-2026",
    "/tools/screen-recorder",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}
