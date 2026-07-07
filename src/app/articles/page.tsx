import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import AdSlot from "@/components/ui/AdSlot";
import { CATEGORIES, getArticlesByCategory } from "@/lib/mock/articles";

export const metadata: Metadata = {
  title: "정보글",
  description:
    "퇴직금, 실업급여, 주휴수당, 권고사직, 알바 급여, 퇴사 체크리스트, 급여명세서 읽는 법에 대한 정보글 모음입니다.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-bold text-primary">정보글</p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">
        궁금한 노동·급여 정보를 찾아보세요
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-sub">
        퇴사, 알바 급여, 실업급여, 주휴수당과 관련해 자주 궁금해하는 내용을
        카테고리별로 모았어요.
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {CATEGORIES.map((category, index) => {
          const articles = getArticlesByCategory(category.slug);
          return (
            <div key={category.slug}>
              <h2 className="text-lg text-text">{category.label}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${category.slug}/${article.slug}`}
                  >
                    <Card className="h-full p-4 transition hover:border-primary/40">
                      <p className="text-sm font-bold text-text">
                        {article.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-sub">
                        {article.excerpt}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>

              {index === 2 && <AdSlot className="mt-8" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
