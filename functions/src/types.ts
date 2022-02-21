type Filter = {
  theme: string[];
  tech?: string[];
  blockchain?: string[];
  sort?: string;
};

type Image = {
  src: string;
  alt: string;
  caption?: string;
  class?: string;
};

type Link = {
  linkText: string;
  href: string;
  extraText?: string;
};

export type Entry = {
  id: string;
  title: string;
  body: string;
  date: string;
  filters: Filter;
  links?: Link[];
  image?: Image;
  color?: string;
  faicon?: string;
  icon?: string;
  scamTotal?: number;
  dateString?: string;
  tweetId?: string;
};

export interface RssEntry extends Entry {
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AlgoliaEntry extends Entry {
  objectID: string;
}
