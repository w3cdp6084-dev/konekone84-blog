import Link from 'next/link'
import { getArticles, getCategories } from '../../lib/newt'
import styles from '@/app/page.module.css'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Newt・Next.jsブログ',
  description: 'NewtとNext.jsを利用したブログです',
}

export default async function Home() {
  const articles = await getArticles();
  const categories = await getCategories();

  return (
    <main className={styles.main}>
      <ul>
        {articles.map((article) => {
          const relatedCategories = article.categories.map((categoryObj) =>
            categories.find((cat) => cat._id === categoryObj._id)
          );
          return (
            <li key={article._id}>
              <Link href={`articles/${article.slug}`}>
                <div>
                  {article.title}
                  <div>
                    {article.coverImage && (
                      <Image src={article.coverImage.src} alt={article.title} width={150} height={150} />
                    )}
                  </div>
                  <p>{relatedCategories.map((cat) => cat?.name).join(", ")}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}


