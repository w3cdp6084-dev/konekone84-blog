export type Metadata = {
    title: string;
    description: string;
    openGraph: {
      type: string;
      url: string;
      title: string;
      description: string;
      images: {
        url: string;
        width: number;
        height: number;
        alt: string;
      }[];
    };
  };