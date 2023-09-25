import { ProductData } from './product.interface';

export interface ordersResponse {
  body: ordersData[];
  code: number;
  message: string;
  ok: boolean;
  totalLength: number;
}

export interface ordersData {
  OrderedProduct: ProductData;
  OrderedProperties: any;
  address: string;
  area: string;
  city: string;
  comment: string;
  createdAt: string;
  name: string;
  orderItems: any;
  orderState: number;
  phone: string;
  productId: string;
  shippingPrice: number;
  storeName: string;
  subAddress: string;
  totalPrice: number;
  buyerCommission?: number;
  _id: string;
}
