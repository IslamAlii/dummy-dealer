export interface ProductResponse {
  code: number;
  body: ProductData[];
  message: string;
  ok: boolean;
  totalLength: number;
}

export interface SingleProductResponse {
  code: number;
  body: ProductData;
  message: string;
  ok: boolean;
}

export interface MerchantProductsResponse {
  status: number;
  message: string;
  data: ProductData[];
  totalLength: number;
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
  properties: any;
  rate: any[];
  rateFree: any[];
  isFavorite: boolean;
  reviews: [];
  __v: number;
  _id: string;
  status?: number;
  shipping_price: any;
}

export interface PaginationObject {
  page: number;
  pageSize: number;
}
