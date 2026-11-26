import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

import { siteConfig } from "@/lib/constants/site";
import { getInsights } from "@/lib/content/insights";
import { getServices } from "@/lib/content/services";
import { getCaseStudies } from "@/lib/content/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const [services, studies, articles] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getInsights(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: path === "" || path === "/insights" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteConfig.url}/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const workRoutes = studies.map((study) => ({
    url: `${siteConfig.url}/work/${study.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightRoutes = articles.map((article) => ({
    url: `${siteConfig.url}/insights/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...insightRoutes];
}
