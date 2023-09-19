import { ProductData } from './product.interface';

export interface MerchantOrdersRespond {
  body: MerchantOrdersData[];
  code: number;
  message: string;
  ok: boolean;
  totalLength: number;
}

export interface MerchantOrdersData {
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
  _id: string;
}
