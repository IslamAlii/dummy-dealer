import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductCardComponent } from './components/all-products/product-card/product-card.component';
import { ProductDetailsComponent } from './components/all-products/product-details/product-details.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AllProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    SpinnerComponent,
    LoaderComponent,
  ],

  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  exports: [SpinnerComponent, LoaderComponent],
})
export class SharedModule {}
