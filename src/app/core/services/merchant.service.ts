import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MerchantOrdersRespond } from 'src/app/interfaces/orders.interface';
import {
  MerchantProductsResponse,
  ProductData,
  SingleProductResponse,
} from 'src/app/interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  constructor(private http: HttpClient) {}

  getMerchantOwnProducts(paginationObject: any) {
    return this.http.get<MerchantProductsResponse>(
      `${environment.apiUrl}products/get-own-products`,
      {
        params: paginationObject,
      }
    );
  }

  addProduct(productData: any) {
    return this.http.post<SingleProductResponse>(
      `${environment.apiUrl}products/create`,
      productData
    );
  }

  editProduct(id: string, data: ProductData) {
    return this.http.patch(`${environment.apiUrl}products/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}products/${id}`);
  }

  getMerchantOwnOrders() {
    return this.http.get<MerchantOrdersRespond>(
      `${environment.apiUrl}users/order/seller`
    );
  }

  updateOrderState(id: string, data: any) {
    return this.http.patch(`${environment.apiUrl}order/${id}`, data);
  }
}
