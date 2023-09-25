import React from 'react';
import Link from 'next/link';

type Section = {
  id: string;
  title: string;
};

type Props = {
  sections?: Section[]; // sections は optional にします
};

const TableOfContents: React.FC<Props> = ({ sections = [] }) => { // デフォルト値として空の配列を設定します
  return (
    <aside>
      <ul>
        {sections.map((section) => (
          <li key={section.id}>
            <Link href={`#${section.id}`}>
              <a>{section.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TableOfContents;
