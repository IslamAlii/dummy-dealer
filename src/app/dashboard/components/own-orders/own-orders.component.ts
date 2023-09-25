import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketerService } from 'src/app/core/services/marketer.service';
import { ordersData } from 'src/app/interfaces/orders.interface';

@Component({
  selector: 'app-own-orders',
  templateUrl: './own-orders.component.html',
  styleUrls: ['./own-orders.component.scss'],
})
export class OwnOrdersComponent implements OnInit {
  private modalRef: any;
  orders!: ordersData[];
  selectedOrder!: ordersData;
  isSpinning!: boolean;
  errorMessage!: string;

  constructor(
    private marketerService: MarketerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.isSpinning = true;
    this.marketerService.getMarketerOwnOrders().subscribe((response) => {
      this.orders = response.body;
      this.isSpinning = false;
    });
  }

  open(content: any, order: ordersData, size?: string) {
    this.selectedOrder = order;
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }
}
