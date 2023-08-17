import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsNum = new BehaviorSubject(0);
  constructor(private _httpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartItemsNum.next(response.numOfCartItems);
      },
    });
  }

  private reqHeaders: HttpHeaders = new HttpHeaders({
    token: localStorage.getItem('userToken') || '',
  });
  addToCart(productID: string): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productID,
      },
      {
        headers: this.reqHeaders,
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.reqHeaders,
    });
  }

  updateProductCount(productID: string, count: number): Observable<any> {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      {
        count: count,
      },
      {
        headers: this.reqHeaders,
      }
    );
  }

  deleteProductFromCart(productID: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      {
        headers: this.reqHeaders,
      }
    );
  }

  clearUserCart(): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: this.reqHeaders,
      }
    );
  }
}
