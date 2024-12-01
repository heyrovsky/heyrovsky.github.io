export interface Article {
  id: number | string;
  imageUrl: string;
  author: string;
  title: string;
  description: string;
  tags: Tag[];
  url: string;
  published: string;
  categories: string[];
  source: string;
  hasImage: boolean;
}

export interface Tag {
  text: string;
  variant?: 'primary' | 'secondary';
}

export interface Section {
  title: string;
  icon: string;
  items: string[];
}

export interface NewsItem {
  hash: string;
  item: {
    title: string;
    description: string;
    links: string[];
    categories: string[];
    source: string;
    authors: { name: string }[];
    image: { url: string };
    published: string;
  };
}

export interface Filter {
  authors: string[];
  topics: string[];
  publications: string[];
}