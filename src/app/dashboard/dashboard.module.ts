import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { LayoutComponent } from './components/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from './components/overview/overview.component';
import {
  NgbdSortableHeader,
  OwnProductsComponent,
} from './components/own-products/own-products.component';
import { OwnProductsRequestsComponent } from './components/own-products-requests/own-products-requests.component';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LayoutComponent,
    OverviewComponent,
    OwnProductsComponent,
    OwnProductsRequestsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    DecimalPipe,
    NgFor,
    NgbdSortableHeader,
  ],
})
export class DashboardModule {}
