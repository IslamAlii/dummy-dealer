import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaketingWebsiteRoutingModule } from './maketing-website-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

import { MarketingWebsiteViewComponent } from './components/marketing-website-view/marketing-website-view.component';
import { NavbarComponent } from './components/marketing-website-view/navbar/navbar.component';
import { FooterComponent } from './components/marketing-website-view/footer/footer.component';
import { HomeComponent } from './components/marketing-website-view/home/home.component';
import { ContactUsComponent } from './components/marketing-website-view/contact-us/contact-us.component';
import { PrivacyComponent } from './components/marketing-website-view/privacy/privacy.component';
import { FaqComponent } from './components/marketing-website-view/faq/faq.component';

@NgModule({
  declarations: [
    MarketingWebsiteViewComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    PrivacyComponent,
    FaqComponent,
  ],

  imports: [
    CommonModule,
    MaketingWebsiteRoutingModule,
    SharedModule,
    NgbAccordionModule,
    FormsModule,
  ],
})
export class MarketingWebsiteModule {}
