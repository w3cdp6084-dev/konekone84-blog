import React from 'react';

export type Header = {
  id: string;
  text: string;
};

type Props = {
  headers: Header[];
};

const TableOfContents: React.FC<Props> = ({ headers }) => {
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
    </nav>
  );
};

export { TableOfContents };