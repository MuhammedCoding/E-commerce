import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsNum = new BehaviorSubject(0);
  cartItemsLoading = new BehaviorSubject(false);

  constructor(private _httpClient: HttpClient) {}

  updateCartItemsNum() {
    this.cartItemsLoading.next(true);

    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cartItemsNum.next(response.numOfCartItems);
        this.cartItemsLoading.next(false);
      },
      error: () => {
        this.cartItemsLoading.next(false);
      },
    });
  }

  private getReqHeaders(): HttpHeaders {
    return new HttpHeaders({
      token: localStorage.getItem('userToken') || '',
    });
  }

  addToCart(productID: string): Observable<any> {
    return this._httpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productID,
      },
      {
        headers: this.getReqHeaders(),
      }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: this.getReqHeaders(), // Use getReqHeaders here
    });
  }

  updateProductCount(productID: string, count: number): Observable<any> {
    return this._httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      {
        count: count,
      },
      {
        headers: this.getReqHeaders(),
      }
    );
  }

  deleteProductFromCart(productID: string): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
      {
        headers: this.getReqHeaders(),
      }
    );
  }

  clearUserCart(): Observable<any> {
    return this._httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        headers: this.getReqHeaders(),
      }
    );
  }
}
