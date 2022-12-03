export interface CategoryData {
  title: string;
  id: string;
}

export interface Quote {
  author: string;
  text: string;
  category: string;
}

export interface QuoteWithId extends Quote {
  id: string;
}

export interface QuoteResponse {
  [id: string]: Quote;
}