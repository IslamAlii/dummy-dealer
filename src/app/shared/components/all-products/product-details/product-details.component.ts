import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductData } from 'src/app/interfaces/product.interface';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private modalRef: any;
  productID!: string;
  product!: ProductData;
  sizes: string[] = [];
  relatedProducts!: ProductData[];
  isLoading = true;
  isDashboard!: boolean;
  errorMessage = '';
  userRole!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userDataService: UserDataService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.productID = params['id'];
    });

    const currentProduct = this.productService.getProductByID(this.productID);
    const relatedProducts = this.productService.getRelatedProducts();
    const userPersonlInfo = this.userDataService.getLoggedUserPersonalInfo();

    forkJoin([currentProduct, relatedProducts, userPersonlInfo]).subscribe(
      ([
        currentProductResponse,
        relatedProductsResponse,
        userPersonlInfoResponse,
      ]) => {
        this.product = currentProductResponse.body;
        this.userRole = userPersonlInfoResponse.body.role;

        if (this.product.sellPrice) {
          this.product.rate = new Array(
            this.calculateRating(this.product.sellPrice)
          );
          this.product.rateFree = new Array(
            5 - this.calculateRating(this.product.sellPrice)
          );
        }
        this.product.properties.forEach((property: any) => {
          if (!this.sizes.includes(property.size)) {
            this.sizes.push(property.size);
          }
        });
        this.relatedProducts = relatedProductsResponse.body;
        this.relatedProducts.forEach((product) => {
          product.rate = new Array(this.calculateRating(product.sellPrice));
          product.rateFree = new Array(
            5 - this.calculateRating(product.sellPrice)
          );
          this.checkIfProductIsFavorite(product);
        });
        this.isLoading = false;
        this.cdRef.detectChanges();
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isLoading = false;
        this.cdRef.detectChanges();
      }
    );
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

  open(content: any, size?: string) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }
}
