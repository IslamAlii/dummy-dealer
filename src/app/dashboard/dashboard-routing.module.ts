import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AllProductsComponent } from '../shared/components/all-products/all-products.component';
import { OwnProductsComponent } from './components/own-products/own-products.component';
import { OwnProductsRequestsComponent } from './components/own-products-requests/own-products-requests.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ProductDetailsComponent } from '../shared/components/all-products/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OwnOrdersComponent } from './components/own-orders/own-orders.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BalanceHistoryComponent } from './components/balance-history/balance-history.component';
import { OrderTrackerComponent } from './components/order-tracker/order-tracker.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      {
        path: 'own-products',
        component: OwnProductsComponent,
      },
      {
        path: 'own-products-requests',
        component: OwnProductsRequestsComponent,
      },

      {
        path: 'own-orders',
        component: OwnOrdersComponent,
      },
      {
        path: 'own-orders/order-tracker/:id',
        component: OrderTrackerComponent,
      },
      {
        path: 'balance',
        component: BalanceComponent,
      },
      {
        path: 'balance-history',
        component: BalanceHistoryComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
