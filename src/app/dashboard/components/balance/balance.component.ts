import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarketerService } from 'src/app/core/services/marketer.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
  private modalRef: any;
  currentBalance!: number;
  lastTransactions: any;
  isSpinning!: boolean;
  errorMessage!: string;

  constructor(
    private modalService: NgbModal,
    private marketerService: MarketerService
  ) {}

  ngOnInit() {
    this.isSpinning = true;

    const currentBalance = this.marketerService.getMarketerBalance();
    const lastTransactions =
      this.marketerService.getUserlastBalanceRequestsTransactions();

    forkJoin([currentBalance, lastTransactions]).subscribe(
      ([currentBalanceResponse, lastTransactionsResponse]) => {
        this.currentBalance = currentBalanceResponse.data.balance;
        this.lastTransactions = lastTransactionsResponse.body;
        this.isSpinning = false;
      },
      (error) => {
        this.errorMessage = 'حدث خطأ ما برجاء التواصل مع الادارة';
        this.isSpinning = false;
      }
    );
  }

  open(content: any, size?: string) {
    this.modalRef = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size ? size : '',
    });
  }
}
