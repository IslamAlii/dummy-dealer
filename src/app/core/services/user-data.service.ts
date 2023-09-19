import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<any>({});
  userData$: Observable<any> = this.userDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getLoggedUserAllInfo() {
    return this.http.get<any>(`${environment.apiUrl}users/get-user`);
  }

  getLoggedUserPersonalInfo() {
    return this.http.get<any>(`${environment.apiUrl}users/get-user-info`);
  }

  setUserData(user: any) {
    this.userDataSubject.next(user);
  }

  getUserData(): Observable<any> {
    return this.userData$;
  }

  updateUserData(data: any) {
    return this.http.patch(`${environment.apiUrl}users/update`, data);
  }
}
