import Link from 'next/link'
import { getArticles, getCategories } from '../../lib/newt'
import styles from '@/app/page.module.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Newt・Next.jsブログ',
  description: 'NewtとNext.jsを利用したブログです',
}

export default async function Home() {
  const articles = await getArticles();
  articles.forEach((article) => {
    console.log('Article date:', article.date); // ここで日付の値を確認
  });
  const categories = await getCategories();

  return (
    <main className={styles.main}>
    <ul>
      {articles.map((article) => {
        // 記事に関連するカテゴリー名を取得
        const relatedCategories = article.categories.map((categoryObj) =>
          categories.find((cat) => cat._id === categoryObj._id)
        );

        // 日付をフォーマット
        const formattedDate = format(new Date(article.date), 'yyyy-MM-dd');

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
                <p>{formattedDate}</p> {/* 日付を表示 */}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  </main>
  );
}


