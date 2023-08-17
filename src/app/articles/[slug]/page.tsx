import { getArticles, getArticleBySlug } from '../../../../lib/newt'
import type { Metadata } from 'next'
import type { Article } from '../../../../types/article'
import PageTransition from '../../components/PageTransition';
import { useClientPath } from '../../hooks/useClientPath';
type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const article = await getArticleBySlug(slug)

  return {
    title: article?.title,
    description: '投稿詳細ページです',
  }
}

export default async function Article({ params }: Props) {
  const { slug } = params
  const article = await getArticleBySlug(slug)
  if (!article) return
  const path = typeof window !== 'undefined' ? useClientPath() : '';
  return (
    <PageTransition path={path}>
    <main>
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </main>
    </PageTransition>
  )
}