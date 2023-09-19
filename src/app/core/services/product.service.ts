import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from 'src/app/interfaces/category.interface';
import {
  PaginationObject,
  ProductResponse,
  SingleProductResponse,
} from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<CategoryResponse>(
      `${environment.apiUrl}products/get-all-categories`
    );
  }

  getAllProducts(paginationObject: any) {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}products/get-all`,
      {
        params: paginationObject,
      }
    );
  }

  getRelatedProducts() {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}products/get-all?page=2&limit=4`
    );
  }

  getProductsByCategory(categoryName: string) {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}products/category/${categoryName}`
    );
  }

  getProductsByName(name: string) {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}products/name/${name}`
    );
  }

  getProductByID(id: string) {
    return this.http.get<SingleProductResponse>(
      `${environment.apiUrl}products/id/${id}`
    );
  }
}
