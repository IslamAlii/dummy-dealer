import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/marketing-website-view/home/home.component';
import { MarketingWebsiteViewComponent } from './components/marketing-website-view/marketing-website-view.component';
import { AllProductsComponent } from '../shared/components/all-products/all-products.component';
import { ProductDetailsComponent } from '../shared/components/all-products/product-details/product-details.component';
import { ContactUsComponent } from './components/marketing-website-view/contact-us/contact-us.component';
import { PrivacyComponent } from './components/marketing-website-view/privacy/privacy.component';
import { FaqComponent } from './components/marketing-website-view/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: MarketingWebsiteViewComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'all-products', component: AllProductsComponent },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'faq', component: FaqComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaketingWebsiteRoutingModule {}
