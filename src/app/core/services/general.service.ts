import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagesResponse } from 'src/app/interfaces/images.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  uploadImages(fd: FormData) {
    return this.http.post<ImagesResponse>(`${environment.apiImageUrl}`, fd);
  }
}
