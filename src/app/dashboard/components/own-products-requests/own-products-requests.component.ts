import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MerchantService } from 'src/app/core/services/merchant.service';
import { MerchantOrdersData } from 'src/app/interfaces/orders.interface';

@Component({
  selector: 'app-own-products-requests',
  templateUrl: './own-products-requests.component.html',
  styleUrls: ['./own-products-requests.component.scss'],
})
export class OwnProductsRequestsComponent implements OnInit {
  private modalRef: any;
  orders!: MerchantOrdersData[];
  selectedOrder!: MerchantOrdersData;
  page = 1;
  pageSize = 10;
  collectionSize!: number;
  isSpinning: boolean = true;
  errorMessage!: string;

  constructor(
    private modalService: NgbModal,
    private merchantService: MerchantService
  ) {}

  ngOnInit() {
    this.getMerchantOwnOrders();
  }

  getMerchantOwnOrders() {
    this.orders = [];
    this.merchantService.getMerchantOwnOrders().subscribe(
      (response) => {
        this.orders = response.body;
        this.collectionSize = response.totalLength;
        this.isSpinning = false;
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
      }
    );
  }

  updateOrderState(state: number) {
    this.isSpinning = true;
    console.log(state);
    this.merchantService
      .updateOrderState(this.selectedOrder._id, {
        orderState: +state,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.getMerchantOwnOrders();
        },
        (error) => {
          this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
          this.isSpinning = false;
        }
      );
  }

  open(content: any, order: MerchantOrdersData, size?: string) {
    this.selectedOrder = order;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }
}
