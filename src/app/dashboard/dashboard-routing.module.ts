import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AllProductsComponent } from '../shared/components/all-products/all-products.component';
import { OwnProductsComponent } from './components/own-products/own-products.component';
import { OwnProductsRequestsComponent } from './components/own-products-requests/own-products-requests.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      {
        path: 'own-products',
        component: OwnProductsComponent,
      },
      {
        path: 'own-products-requests',
        component: OwnProductsRequestsComponent,
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
