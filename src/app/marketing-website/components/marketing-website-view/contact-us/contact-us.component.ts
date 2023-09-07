import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MarketingWebsiteService } from 'src/app/core/services/marketing-website.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  constructor(
    private marketingWebsiteService: MarketingWebsiteService,
    private toastr: ToastrService
  ) {}

  sendMessageForUs(form: any) {
    const contactData: any = {};
    Object.entries(form.value).forEach(([key, value], index) => {
      if (value != '') {
        contactData[key] = value;
      }
    });

    this.marketingWebsiteService.sendMessageForUs(contactData).subscribe(
      (res) => {
        form.reset();
        this.toastr.success('تم ارسال الرسالة بنجاح');
      },
      (error) => {}
    );
  }
}
