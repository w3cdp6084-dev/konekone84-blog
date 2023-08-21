import { getArticles, getArticleBySlug } from '../../../../lib/newt'
import type { Metadata } from 'next'
import type { Article } from '../../../../types/article'
import PageTransition from '../../components/PageTransition';
import { useClientPath } from '../../hooks/useClientPath';
import { TableOfContents, Header } from '../../components/TableOfContents'; // 中括弧を使用して明示的にインポート
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
  const headers: Header[] = [
    { id: "section1", text: article.subtitleh2 },
    { id: "section1-subsection1", text: article.subtitleh3 },
  ];
  return (
    <PageTransition path={path}>
    <main>
      <h1>{article.title}</h1>
      <h2 id="section1">{article.subtitleh2}</h2>
      <h3 id="section1-subsection1">{article.subtitleh3}</h3>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
      <TableOfContents headers={headers} />
    </main>
    </PageTransition>
  )
}