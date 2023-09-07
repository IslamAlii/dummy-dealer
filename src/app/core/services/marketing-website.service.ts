import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarketingWebsiteService {
  constructor(private http: HttpClient) {}

  sendMessageForUs(form: any) {
    return this.http.post(`${environment.apiUrl}contact-us/add`, form);
  }
}
