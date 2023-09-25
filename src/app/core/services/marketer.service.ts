import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ordersResponse } from 'src/app/interfaces/orders.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarketerService {
  constructor(private http: HttpClient) {}

  getMarketerOwnOrders() {
    return this.http.get<ordersResponse>(
      `${environment.apiUrl}users/order/buyer`
    );
  }

  getOrederById(id: string) {
    return this.http.get(`${environment.apiUrl}users/order/buyer/${id}`);
  }

  getMarketerBalance() {
    return this.http.get<any>(`${environment.apiUrl}users/balance`);
  }

  getUserBalanceRequestsTransactions() {
    return this.http.get<any>(`${environment.apiUrl}users/withdrawal/buyer`);
  }

  getUserlastBalanceRequestsTransactions() {
    return this.http.get<any>(
      `${environment.apiUrl}users/withdrawal/buyer/latest`
    );
  }
}
