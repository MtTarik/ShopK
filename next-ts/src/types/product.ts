// ----------------------------------------------------------------------

export type IProductFilterValue = string | string[] | number | number[];

export type IProductFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};



export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IProductItem = {
  objectID: number;
  name: string;
  price: number;
  categories: { id: number; name: string }[];
  description: string;
  image: string;
};


export type IProductTableFilterValue = {
  id: number;
  name: string;
}[];


export type IProductTableFilters = {
  categories: { id: number; name: string }[];
};
