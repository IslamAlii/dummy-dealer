import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/core/services/general.service';
import { MerchantService } from 'src/app/core/services/merchant.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductData } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-own-products',
  templateUrl: './own-products.component.html',
  styleUrls: ['./own-products.component.scss'],
})
export class OwnProductsComponent implements OnInit {
  @ViewChild('carousel', { static: true }) carousel!: NgbCarousel;

  private modalRef: any;
  products!: ProductData[];
  selectedProduct!: ProductData;
  categories!: string[];
  currentPage = 1;
  itemsPerPage = 10;
  collectionSize!: number;
  isSpinning!: boolean;
  files: File[] = [];
  productProperties: any[] = [];
  shipping_price: any = {
    cairo: 35,
    giza: 35,
    alexandria: 35,
    'ain sokhna': 50,
    'al Fayoum': 50,
    'al gharbia': 50,
    'al sharqia': 50,
    aswan: 50,
    asyut: 50,
    'bani sweif': 50,
    dakahlia: 50,
    damietta: 50,
    'el beheira': 50,
    'el menya': 50,
    'red sea': 50,
    ismailia: 50,
    'kafr el sheikh': 50,
    'new valley': 50,
    'north sinai': 50,
    matruh: 50,
    luxor: 50,
    'el menofia': 50,
    'port said': 50,
    qena: 50,
    sohag: 50,
    'south of sinai': 50,
    suez: 50,
  };
  sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'];
  errorMessage!: string;
  maximumImagesCountReached!: boolean;

  constructor(
    private toastr: ToastrService,
    private modalService: NgbModal,
    private merchantService: MerchantService,
    private productsService: ProductService,
    private generalService: GeneralService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMerchantOwnProducts({
      page: this.currentPage,
      limit: this.itemsPerPage,
    });
    this.getAllCategories();
  }

  getMerchantOwnProducts(paginationObject: any) {
    this.products = [];
    this.isSpinning = true;
    this.merchantService.getMerchantOwnProducts(paginationObject).subscribe(
      (response) => {
        this.collectionSize = response.totalLength;
        this.products = response.data;
        this.isSpinning = false;
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
        this.cdRef.detectChanges();
      }
    );
  }

  getAllCategories() {
    this.productsService.getAllCategories().subscribe(
      (response) => {
        this.categories = response.body;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
      }
    );
  }

  getProductDetails(productData: ProductData) {
    this.selectedProduct = productData;
  }

  addProduct(form: NgForm) {
    this.products = [];
    this.isSpinning = true;

    const productModel: any = {
      name: form.value.productName,
      category: form.value.productCategory,
      originalPrice: form.value.productPrice,
      properties: this.productProperties,
      description: form.value.description,
      shipping_price: this.shipping_price,
    };

    const fd: FormData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      fd.append('avatar', this.files[i], this.files[i]?.name);
    }

    this.generalService.uploadImages(fd).subscribe((response) => {
      productModel.image = response.data;
      this.merchantService.addProduct(productModel).subscribe({
        next: (response) => {
          this.toastr.success('تم اضافة المنتج بنجاح');
          this.getMerchantOwnProducts({
            page: this.currentPage,
            limit: this.itemsPerPage,
          });
          this.isSpinning = false;
        },
        error: (error) => {
          this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
          this.isSpinning = false;
          this.cdRef.detectChanges();
        },
      });
    });
  }

  editProduct(form: NgForm) {
    this.products = [];
    this.isSpinning = true;

    const productModel: any = {
      name: form.value.productName,
      category: form.value.productCategory,
      originalPrice: form.value.productPrice,
      properties: [],
      description: form.value.description,
      shipping_price: this.shipping_price,
    };

    if (this.files.length) {
      console.log('lols');
      const fd: FormData = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        fd.append('avatar', this.files[i], this.files[i]?.name);
      }

      this.generalService.uploadImages(fd).subscribe((response) => {
        console.log(response);
        productModel.image = response.data;
        this.merchantService
          .editProduct(this.selectedProduct._id, productModel)
          .subscribe({
            next: (response) => {
              this.toastr.success('تم تعديل بيانات المنتج بنجاح');
              this.getMerchantOwnProducts({
                page: this.currentPage,
                limit: this.itemsPerPage,
              });
              this.isSpinning = false;
            },
            error: (error) => {
              this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
              this.isSpinning = false;
              this.cdRef.detectChanges();
            },
          });
      });
    }

    if(!this.files.length) {
      this.merchantService
        .editProduct(this.selectedProduct._id, productModel)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('تم تعديل بيانات المنتج بنجاح');
            this.getMerchantOwnProducts({
              page: this.currentPage,
              limit: this.itemsPerPage,
            });
            this.isSpinning = false;
          },
          error: (error) => {
            this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
            this.isSpinning = false;
            this.cdRef.detectChanges();
          },
        });
    }
  }

  deleteProduct() {
    this.products = [];
    this.isSpinning = true;
    this.merchantService.deleteProduct(this.selectedProduct._id).subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('تم حذف المنتج بنجاح');
        this.getMerchantOwnProducts({
          page: this.currentPage,
          limit: this.itemsPerPage,
        });
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
      }
    );
  }

  addProperity(amount: number, color: string, size: string) {
    let properity = {
      amount: amount,
      color: color,
      size: size,
    };
    this.productProperties.push(properity);
  }

  editProperty(index: number, amount: number) {
    this.productProperties[index].amount = amount;
    this.toastr.success('تم تعديل الكمية الخاصة بمواصفات المنتج بنجاح');
  }

  removeProperity(index: number) {
    this.productProperties.splice(index, 1);
  }

  updateShippingPrice(gov: string, price: number) {
    if (this.selectedProduct) {
      this.shipping_price = this.selectedProduct.shipping_price;
      this.selectedProduct.shipping_price[gov] = price;
      this.toastr.success(`تم تعديل سعر شحن محافظة ${gov}`);
    } else {
      this.shipping_price[gov] = price;
      this.toastr.success(`تم تعديل سعر شحن محافظة ${gov}`);
    }
  }

  open(content: any, size?: string) {
    this.files = [];
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }

  onSelect(event: any) {
    if (event.addedFiles.length <= 8) {
      this.files.push(...event.addedFiles);
      this.maximumImagesCountReached = false;
    } else {
      this.maximumImagesCountReached = true;
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
