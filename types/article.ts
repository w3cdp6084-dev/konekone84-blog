export type Article = {
  date: string;
  categories: any;
  category: string;
  body: string | TrustedHTML;
  ogImage: any;
  coverImage: any;
  _id: string;
  _sys: {
    createdAt: string;
    updatedAt: string;
    raw: {
      createdAt: string;
      updatedAt: string;
      firstPublishedAt: string;
      publishedAt: string;
    };
  };
  title: string;
  slug: string;
  meta:{
    coverImage: any;
    title: string;
    description: string;
    ogImage: {
      _id: string;
      src: string;
      fileType: string;
      fileSize: number;
      fileName: string;
      width: number;
      height: number;
    };
  body: string;
}
createdAt: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
 };