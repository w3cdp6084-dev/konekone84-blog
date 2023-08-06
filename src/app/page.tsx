import Link from 'next/link'
import { getArticles } from '../../lib/newt'
import styles from '@/app/page.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Newt・Next.jsブログ',
  description: 'NewtとNext.jsを利用したブログです',
}

export default async function Home() {
  const articles = await getArticles()
  return (
    <main className={styles.main}>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article._id}>
              <Link href={`articles/${article.slug}`}>{article.title}</Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
