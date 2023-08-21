import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
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
}
