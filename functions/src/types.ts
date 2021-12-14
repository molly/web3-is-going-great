export type EntryQuery = {
  limit?: number;
  cursor?: string;
  theme: string[];
  tech?: string[];
  blockchain?: string[];
  sort?: string;
};

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
};
