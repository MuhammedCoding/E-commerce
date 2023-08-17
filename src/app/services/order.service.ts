import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _httpClient: HttpClient) {}

  getUserOrders(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/orders',
      {
        headers: {
          token: localStorage.getItem('userToken')!,
        },
      }
    );
  }
}
