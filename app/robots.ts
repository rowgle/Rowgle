import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/onboarding", "/approve", "/unbuilt-agreement"],
    },
    sitemap: "https://rowgle.com/sitemap.xml",
  }
}