import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private _httpClient: HttpClient) {}

  private reqHeaders: HttpHeaders = new HttpHeaders({
    token: localStorage.getItem('userToken') || '',
  });
  addToWishlist(productID: string): Observable<any> {
    return this._httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        productId: productID,
      },
      {
        headers: this.reqHeaders,
      }
    );
  }

  getWishList(): Observable<any> {
    return this._httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        headers: this.reqHeaders,
      }
    );
  }

  deleteProductFromWishlist(productID: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,
      {
        headers: this.reqHeaders,
      }
    );
  }
}
