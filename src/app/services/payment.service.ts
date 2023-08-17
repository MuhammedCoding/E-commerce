import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _httpClient: HttpClient) {}

  private reqHeaders: HttpHeaders = new HttpHeaders({
    token: localStorage.getItem('userToken') || '',
  });
  payOnline(shippingAddress: object, cartID: string): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAddress,
      },
      {
        headers: this.reqHeaders,
      }
    );
  }
}
