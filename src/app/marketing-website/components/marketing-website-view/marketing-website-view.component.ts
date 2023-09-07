import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RoutingAnimation } from 'src/app/animations/routing-animation';

@Component({
  selector: 'app-marketing-website-view',
  templateUrl: './marketing-website-view.component.html',
  styleUrls: ['./marketing-website-view.component.scss'],
  animations: [RoutingAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarketingWebsiteViewComponent {
  onActivate(event: any) {
    setTimeout(() => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 800);
  }
}
