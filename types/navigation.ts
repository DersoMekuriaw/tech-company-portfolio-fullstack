export type RootStackParamList = {
  '(tabs)': undefined;
  'service-detail/[id]': { id: string };
  'portfolio-detail/[id]': { id: string };
  'product-detail/[id]': { id: string };
  'article-detail/[id]': { id: string };
};

export type TabParamList = {
  index: undefined;
  services: undefined;
  products: undefined;
  portfolio: undefined;
  news: undefined;
  about: undefined;
  contact: undefined;
};