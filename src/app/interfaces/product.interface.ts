export interface ProductResponse {
  code: number;
  body: ProductData[];
  message: string;
  ok: boolean;
  totalLength: number;
}

export interface singleProductResponse {
  code: number;
  body: ProductData;
  message: string;
  ok: boolean;
}

export interface ProductData {
  image: any;
  name: string;
  category: string;
  description: string;
  originalPrice: number;
  sellPrice: number;
  total_amount: number;
  seller: string;
  createdAt: Date;
  numOfReviews: number;
  properties: [];
  rate: any[];
  rateFree: any[];
  isFavorite: boolean;
  reviews: [];
  __v: number;
  _id: string;
}

export interface PaginationObject {
  page: number;
  pageSize: number;
}
