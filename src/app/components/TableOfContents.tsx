"use client";
import React from 'react';
import { getArticleBySlug } from '../../../lib/newt';
import type { Article } from '../../../types/article';

export type Header = {
  id: string;
  text: string;
};

type Props = {
  slug: string;
};

const TableOfContents: React.FC<Props> = ({ slug }) => {
  const [article, setArticle] = React.useState<Article | null>(null);
  const headers: Header[] = [];
  React.useEffect(() => {
    const fetchArticle = async () => {
      const result = await getArticleBySlug(slug);
      setArticle(result);
    };
    fetchArticle();
  }, [slug]);
  if (article) {
    const regex = /<h([2-3]) id="([^"]+)">([^<]+)<\/h[2-3]>/g;
    let match;
    while ((match = regex.exec(article.body)) !== null) {
      const [, level, id, text] = match;
      headers.push({ id, text });
    }
  }
  return (
    <nav>
      <h2>目次</h2>
      <ul>
        {headers.map((header) => (
          <li key={header.id}>
            <a href={`#${header.id}`}>{header.text}</a>
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: article?.body.toString() || '' }} />
    </nav>
  );
};

export { TableOfContents };