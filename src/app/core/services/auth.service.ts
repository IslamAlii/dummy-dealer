import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserLoginResponse, UserLoginSentData } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(data: UserLoginSentData): Observable<any> {
    return this.http
      .post<UserLoginResponse>(`${environment.apiUrl}users/login`, data)
      .pipe(
        tap((response: UserLoginResponse) => {
          if (response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  userRegister(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}users/signup`, data);
  }

  forgetPassword(email: any) {
    return this.http.put(`${environment.apiUrl}users/forget-password`, email);
  }

  userLogout() {
    this.clearToken();
  }

  setToken(token: string) {
    localStorage.setItem('user_token', token);
  }

  getToken() {
    return localStorage.getItem('user_token') || '';
  }

  clearToken() {
    localStorage.removeItem('user_token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
