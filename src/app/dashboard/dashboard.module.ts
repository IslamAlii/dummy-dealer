import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { LayoutComponent } from './components/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './components/overview/overview.component';
import { OwnProductsComponent } from './components/own-products/own-products.component';
import { OwnProductsRequestsComponent } from './components/own-products-requests/own-products-requests.component';
import { FormsModule } from '@angular/forms';
import {
  NgbCarouselModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProfileComponent } from './components/profile/profile.component';
import { OwnOrdersComponent } from './components/own-orders/own-orders.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BalanceHistoryComponent } from './components/balance-history/balance-history.component';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker.component';

@NgModule({
  declarations: [
    LayoutComponent,
    OverviewComponent,
    OwnProductsComponent,
    OwnProductsRequestsComponent,
    ProfileComponent,
    OwnOrdersComponent,
    BalanceComponent,
    BalanceHistoryComponent,
    OrderTrackerComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbCarouselModule,
    NgIf,
    NgxDropzoneModule,
  ],
})
export class DashboardModule {}
