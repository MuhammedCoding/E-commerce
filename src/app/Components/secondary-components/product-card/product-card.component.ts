import { WishlistService } from './../../../services/wishlist.service';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

import { Component, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],

  animations: [
    trigger('productAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('1s ease-out')),
    ]),
  ],
})
export class ProductCardComponent {
  @Input() product!: Product;

  isAddLoading: boolean = false;
  constructor(
    private _cartService: CartService,
    private _wishlistService: WishlistService,
    private toastr: ToastrService
  ) {}

  addToCart(productId: string) {
    this.isAddLoading = true;
    this._cartService.addToCart(productId).subscribe({
      next: (response) => {
        this._cartService.cartItemsNum.next(response.numOfCartItems);
        this.isAddLoading = false;
        this.toastr.success('Product added to cart successfully!', 'Success', {
          timeOut: 2500,
        });
        this.toastr.toastrConfig.timeOut = 2000;
      },
      error: (err) => {
        this.isAddLoading = false;
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }

  addToWishList(productId: string) {
    this._wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        this.toastr.success(
          'Product added to your wishlist successfully!',
          'Success',
          {
            timeOut: 2500,
          }
        );
        this.toastr.toastrConfig.timeOut = 2000;
      },
      error: () => {
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }
}
