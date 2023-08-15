import Link from 'next/link'
import { getArticles, getCategories } from '../../lib/newt'
import styles from '@/app/page.module.scss'
import type { Metadata } from 'next'
import Image from 'next/image'
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Newt・Next.jsブログ',
  description: 'NewtとNext.jsを利用したブログです',
}

export default async function Home() {
  const articles = await getArticles(9);
  const categories = await getCategories();

  return (
    <main className={styles.main}>
    <ul className={styles.CardList}>
      {articles.map((article) => {
        const relatedCategories = article.categories.map((categoryObj: { _id: string }) =>
          categories.find((cat) => cat._id === categoryObj._id)
        );
        const formattedDate = format(new Date(article.date), 'yyyy-MM-dd');

        return (
          <li key={article._id} className={styles.Card}>
            <Link href={`articles/${article.slug}`}>
              <div className={styles.CardInner}>
                <div className={styles.CardInnerImg}>
                  {article.coverImage && (
                    <Image src={article.coverImage.src} alt={article.title} width={150} height={150} />
                  )}
                </div>
                <h3>{article.title}</h3>
                <p>{relatedCategories.map((cat: { name: any }) => cat?.name).join(", ")}</p>
                <p>{formattedDate}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  </main>
  );
}