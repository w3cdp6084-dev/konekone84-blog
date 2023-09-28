import { getArticles, getArticleBySlug } from '../../../../lib/newt'
import type { Metadata } from 'next'
import type { Article } from '../../../../types/article'
import PageTransition from '../../components/PageTransition';
import { useClientPath } from '../../hooks/useClientPath';
import ShareButtons from '../../components/ShareButtons';
import { load } from 'cheerio'


type Props = {
  params: {
    slug: string
  },
}

// Define the Section type
type Section = {
  id: string;
  title: string;
};

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
  if (!article) return
  const headings: string[] = []
  const $ = load(article.body.toString()) // 1
 $('h2').each((_, elm) => { // 2
   const text = $(elm).text() // 3
   headings.push(text)
   $(elm).contents().wrap(`<a id="${text}" href="#${text}"></a>`) // 4
 })
 article.body = $.html() // 5

  return (
    <PageTransition path={path}>
    <main>
      <h1>{article.title}</h1>
      <div className='tableOdContents'>
        <h2>Table Of Contents</h2>
        <ol>
          {headings.map((text, index) => {
            return (
              <li key={index}>
                <a href={`#${text}`}>{text}</a>
              </li>
            )
          })}
        </ol>
      </div>
      <h2 id="section1">{article.subtitleh2}</h2>
      <h3 id="section1-subsection1">{article.subtitleh3}</h3>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
      <ShareButtons url="https://yourwebsite.com" title="Your Website Title" />
    </main>
    </PageTransition>
  )
}
