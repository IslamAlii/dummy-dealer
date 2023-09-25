import { Component } from '@angular/core';
import { MarketerService } from 'src/app/core/services/marketer.service';

@Component({
  selector: 'app-balance-history',
  templateUrl: './balance-history.component.html',
  styleUrls: ['./balance-history.component.scss'],
})
export class BalanceHistoryComponent {
  balanceRequests: any;
  errorMessage!: string;
  isSpinning!: boolean;

  constructor(private marketerService: MarketerService) {}

  ngOnInit() {
    this.isSpinning = true;
    this.marketerService.getUserBalanceRequestsTransactions().subscribe(
      (response: any) => {
        this.balanceRequests = response.data;
        this.isSpinning = false;
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
      }
    );
  }
}
