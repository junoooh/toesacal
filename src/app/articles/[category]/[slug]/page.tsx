import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AdSlot from "@/components/ui/AdSlot";
import Disclaimer from "@/components/ui/Disclaimer";
import {
  ARTICLES,
  getArticle,
  getArticlesByCategory,
  getCategory,
} from "@/lib/mock/articles";

type PageParams = { category: string; slug: string };

export function generateStaticParams(): PageParams[] {
  return ARTICLES.map((article) => ({
    category: article.category,
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  return {
    title: article ? article.title : "정보글",
    description: article?.excerpt,
    alternates: { canonical: `/articles/${category}/${slug}` },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { category, slug } = await params;
  const categoryInfo = getCategory(category);
  const article = getArticle(category, slug);

  if (!categoryInfo || !article) {
    notFound();
  }

  const relatedArticles = getArticlesByCategory(category).filter(
    (a) => a.slug !== slug
  );
  const midpoint = Math.ceil(article.body.length / 2);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <Link
        href={`/articles`}
        className="text-xs font-bold text-primary hover:underline"
      >
        ← 정보글 목록으로
      </Link>

      <p className="mt-4 text-sm font-bold text-primary">
        {categoryInfo.label}
      </p>
      <h1 className="mt-2 text-2xl text-text sm:text-3xl">{article.title}</h1>

      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-text">
        {article.body.slice(0, midpoint).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <AdSlot />

        {article.body.slice(midpoint).map((paragraph, i) => (
          <p key={midpoint + i}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <Disclaimer />
      </div>

      {relatedArticles.length > 0 && (
        <div className="mt-10">
          <AdSlot className="mb-5" />
          <Card className="p-6">
            <h2 className="text-base text-text">
              {categoryInfo.label} 관련 글 더 보기
            </h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <Button
                  key={related.slug}
                  href={`/articles/${category}/${related.slug}`}
                  variant="outline"
                  className="justify-start text-left"
                >
                  {related.title}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
