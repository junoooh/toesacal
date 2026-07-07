import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 정적 내보내기(output: export) 빌드에서는 빌드 시점에 고정 생성되도록 명시해야 합니다.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
