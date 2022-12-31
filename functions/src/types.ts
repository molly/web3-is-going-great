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
  link?: string;
  class?: string;
  isLogo: boolean;
};

type Link = {
  linkText: string;
  href: string;
  extraText?: string;
};

export type ScamAmountDetails = {
  total: number;
  hasScamTotal: boolean;
};

export type Entry = {
  id: string;
  readableId: string;
  title: string;
  shortTitle: string;
  body: string;
  date: string;
  filters: Filter;
  links?: Link[];
  image?: Image;
  color?: string;
  faicon?: string;
  icon?: string;
  scamAmountDetails?: ScamAmountDetails;
  dateString?: string;
  tweetId?: string;
  collection?: string[];
};

export interface RssEntry extends Entry {
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AlgoliaEntry extends Entry {
  objectID: string;
}

export type ResizeResult = {
  size: number;
  success: boolean;
};
