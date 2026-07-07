import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ARTICLES } from "@/lib/mock/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/retirement`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/unemployment`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/holiday-pay`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/articles`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}/articles/${article.category}/${article.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
