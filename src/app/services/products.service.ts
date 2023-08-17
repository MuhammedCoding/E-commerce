import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpCleint: HttpClient) {}

  getProducts(): Observable<any> {
    return this._httpCleint.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }

  getProductDetails(id: string): Observable<any> {
    return this._httpCleint.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  getCategories(): Observable<any> {
    return this._httpCleint.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }
  getBrands(): Observable<any> {
    return this._httpCleint.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
  }
}
