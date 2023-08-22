import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private reqHeaders: HttpHeaders = new HttpHeaders({
    token: localStorage.getItem('userToken') || '',
  });

  constructor(private _httpClient: HttpClient) {}

  registerUser(userData: object): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  login(userData: object): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }

  forgetPassword(userData: object): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      userData
    );
  }

  changePassword(userData: object): Observable<any> {
    return this._httpClient.put(
      'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
      userData,
      {
        headers: this.reqHeaders,
      }
    );
  }
}
