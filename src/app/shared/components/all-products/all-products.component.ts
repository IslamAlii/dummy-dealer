import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import {
  PaginationObject,
  ProductData,
} from 'src/app/interfaces/product.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  categories: string[] = [];
  products: ProductData[] = [];
  // isLoading: boolean = true;
  isSpinnig: boolean = true;
  errorMessage!: string;
  selectedCategory: string = '';
  paginatedProducts!: ProductData[];
  pageSize = 12;
  currentPage = 1;
  totalPages!: number;
  pages!: number[];

  constructor(
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const categories = this.productService.getAllCategories();
    const products = this.productService.getAllProducts({
      page: this.currentPage,
      pageSize: this.pageSize,
    });

    forkJoin([categories, products]).subscribe(
      ([categoriesResponse, productsResponse]) => {
        this.categories = categoriesResponse.body;
        this.totalPages = Math.ceil(
          productsResponse.totalLength / this.pageSize
        );
        this.setPage(1);
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinnig = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getAllProducts(PaginationObject: PaginationObject) {
    this.isSpinnig = true;
    this.productService.getAllProducts(PaginationObject).subscribe(
      (res) => {
        this.products = res.body;
        this.addingRating(this.products);
        this.isSpinnig = false;
        this.cdRef.detectChanges();
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinnig = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getProductsByCategory() {
    this.isSpinnig = true;
    if (this.selectedCategory === '') {
      this.getAllProducts({
        page: 1,
        pageSize: this.pageSize,
      });
    } else {
      this.productService
        .getProductsByCategory(this.selectedCategory)
        .subscribe(
          (res) => {
            this.products = res.body;
            this.addingRating(this.products);

            this.isSpinnig = false;
            this.cdRef.detectChanges();
          },
          (error) => {
            this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
            this.isSpinnig = false;
            this.cdRef.detectChanges();
          }
        );
    }
  }

  getProductsByName(name: string) {
    if (name !== '') {
      this.isSpinnig = true;
      this.productService.getProductsByName(name).subscribe(
        (res) => {
          this.products = res.body;
          this.addingRating(this.products);
          this.isSpinnig = false;
          this.cdRef.detectChanges();
        },
        (error) => {
          this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
          this.isSpinnig = false;
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

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginatedProducts = this.products.slice(
      (page - 1) * this.pageSize,
      page * this.pageSize
    );
    this.calculatePages();
    this.getAllProducts({
      page: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  prevPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
    this.setPage(this.currentPage + 1);
  }

  calculatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
}
