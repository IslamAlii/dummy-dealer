import { Component } from '@angular/core';
import { RoutingAnimation } from './animations/routing-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [RoutingAnimation],
})
export class AppComponent {}
