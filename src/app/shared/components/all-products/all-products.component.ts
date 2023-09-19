import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import {
  PaginationObject,
  ProductData,
} from 'src/app/interfaces/product.interface';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  categories: string[] = [];
  products: ProductData[] = [];
  isSpinning: boolean = true;
  isDashboard!: boolean;
  errorMessage!: string;
  selectedCategory: string = '';
  paginatedProducts!: ProductData[];
  currentPage = 1;
  itemsPerPage = 12;
  collectionSize!: number;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isDashboard = this.authService.isAuthenticated();
    const categories = this.productService.getAllCategories();
    const products = this.productService.getAllProducts({
      page: this.currentPage,
      pageSize: this.itemsPerPage,
    });

    forkJoin([categories, products]).subscribe(
      ([categoriesResponse, productsResponse]) => {
        this.categories = categoriesResponse.body;
        this.collectionSize = productsResponse.totalLength;
        this.products = productsResponse.body;
        this.products.forEach((product) =>
          this.checkIfProductIsFavorite(product)
        );
        this.isSpinning = false;
        this.cdRef.detectChanges();
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getAllProducts(PaginationObject: PaginationObject) {
    this.isSpinning = true;
    this.productService.getAllProducts(PaginationObject).subscribe(
      (res) => {
        this.products = res.body;
        this.addingRating(this.products);
        this.products.forEach((product) =>
          this.checkIfProductIsFavorite(product)
        );
        this.isSpinning = false;
        this.cdRef.detectChanges();
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getProductsByCategory() {
    this.isSpinning = true;
    if (this.selectedCategory === '') {
      this.getAllProducts({
        page: 1,
        pageSize: this.itemsPerPage,
      });
    } else {
      this.productService
        .getProductsByCategory(this.selectedCategory)
        .subscribe(
          (res) => {
            this.products = res.body;
            this.addingRating(this.products);

            this.isSpinning = false;
            this.cdRef.detectChanges();
          },
          (error) => {
            this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
            this.isSpinning = false;
            this.cdRef.detectChanges();
          }
        );
    }
  }

  getProductsByName(name: string) {
    if (name !== '') {
      this.isSpinning = true;
      this.productService.getProductsByName(name).subscribe(
        (res) => {
          this.products = res.body;
          this.addingRating(this.products);
          this.isSpinning = false;
          this.cdRef.detectChanges();
        },
        (error) => {
          this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
          this.isSpinning = false;
          this.cdRef.detectChanges();
        }
      );
    }
  }

  addingRating(products: ProductData[]) {
    this.products.forEach((product) => {
      product.rate = new Array(this.calculateRating(product.sellPrice));
      product.rateFree = new Array(5 - this.calculateRating(product.sellPrice));
      this.checkIfProductIsFavorite(product);
    });
  }

  calculateRating(price: number) {
    return Math.floor((100 / price) * 5 + 1);
  }

  checkIfProductIsFavorite(product: ProductData) {
    const favoriteList = JSON.parse(localStorage.getItem('favoriteList')!);
    if (favoriteList) {
      if (favoriteList.includes(product._id)) {
        product.isFavorite = true;
      } else {
        product.isFavorite = false;
      }
    } else {
      product.isFavorite = false;
    }
  }
}
