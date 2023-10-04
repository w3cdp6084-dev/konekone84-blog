import React, { useState, useEffect } from 'react';
import { getArticles, getArticleBySlug } from '../../../../lib/newt';
import type { Article as ArticleType } from '../../../../types/article';
import PageTransition from '../../components/PageTransition';
import ShareButtons from '../../components/ShareButtons';
import Pagination from '../../components/Pagination';
import { load } from 'cheerio';

type ArticleProps = {
  article: ArticleType;
  slug: string;
};

const Article: React.FC<ArticleProps> = ({ article: initialArticle, slug }) => {
  const [article, setArticle] = useState<ArticleType | null>(initialArticle);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchTotalPages = async () => {
      const allArticles = await getArticles();
      setTotalPages(allArticles.length);
    };
    fetchTotalPages();
  }, []);

  if (!article) return null;

  const headings: string[] = [];
  const $ = load(article.body.toString());
  $('h2').each((_, elm) => {
    const text = $(elm).text();
    headings.push(text);
    $(elm).contents().wrap(`<a id="${text}" href="#${text}"></a>`);
  });
  article.body = $.html();

  return (
    <PageTransition path={`/articles/${slug}`}>
      <main>
        <h1>{article.title}</h1>
        <div className='tableOfContents'>
          <h2>Table Of Contents</h2>
          <ol>
            {headings.map((text, index) => (
              <li key={index}>
                <a href={`#${text}`}>{text}</a>
              </li>
            ))}
          </ol>
        </div>
        <h2 id="section1">{article.subtitleh2}</h2>
        <h3 id="section1-subsection1">{article.subtitleh3}</h3>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        <ShareButtons url={`https://yourwebsite.com/articles/${slug}`} title={article.title} />
        <Pagination currentPage={1} totalPages={totalPages} />
      </main>
    </PageTransition>
  );
};

export async function getStaticPaths() {
  const articles = await getArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { notFound: true };
  }
  return { props: { article, slug: params.slug } };
}

export default Article;
