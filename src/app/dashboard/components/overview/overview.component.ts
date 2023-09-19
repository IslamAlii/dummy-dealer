import { Component } from '@angular/core';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userRole!: string;
  allProducts!: number;
  successProducts!: number;
  canceledProducts!: number;
  totalStock!: number;
  merchantAllOrders!: number;
  ordersFinished!: number;
  marketerAllOrders!: number;
  successOrders!: number;
  ordersShipped!: number;
  ordersUnderProcess!: number;
  canceledOrderd!: number;
  profit!: number;
  allBalance!: number;

  constructor(private userData: UserDataService) {}

  ngOnInit() {
    this.userData.getLoggedUserAllInfo().subscribe((response) => {
      this.userData.setUserData(response.body);
      this.userData.getUserData().subscribe((response) => {
        this.userRole = response.user.role;

        if (this.userRole === 'seller') {
          this.allProducts = response.allProducts;
          this.successProducts = response.ordersFinished;
          this.canceledProducts = response.cancelledOrders;
          this.totalStock = response.totalStock;
          this.merchantAllOrders = response.allOrders;
          this.ordersFinished = response.ordersFinished;
        }

        if (this.userRole === 'buyer') {
          this.marketerAllOrders = response.allOrders;
          this.successOrders = response.ordersFinished;
          this.ordersShipped = response.ordersShipped;
          this.ordersUnderProcess = response.ordersUnderProcess;
          this.canceledOrderd = response.cancelledOrders;
          this.profit = response.profit;
          this.allBalance = response.AvailableBalance;
        }
      });
    });
  }
}
