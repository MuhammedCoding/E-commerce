import { Product } from '../../../../../interfaces/product';
import { Component } from '@angular/core';
import { Cart } from '../../../../../interfaces/cart';
import { CartService } from '../../../../../services/cart.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,

} from '../../../../../animations/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class CartComponent {
  cart: Cart | undefined;
  cartID: string = '';
  setTimeCounter: any;
  isClearLoading: boolean = false;
  isPaymentLoading: boolean = false;
  isCountZero: boolean = false;
  isLoading: boolean = true;

  loadingProductRemoval: { [productId: string]: boolean } = {};

  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this.cart = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.cart = {
          totalCartPrice: 0,
        } as Cart;

        this.isLoading = false;
      },
    });
  }

  updateProductCount(productID: string, count: number) {
    clearTimeout(this.setTimeCounter);
    this.setTimeCounter = setTimeout(() => {
      this._cartService.updateProductCount(productID, count).subscribe({
        next: (response) => {
          this.cart = response.data;
          this.cartID = this.cart?._id!;
          this.isCountZero = false;
          this._cartService.cartItemsNum.next(response.numOfCartItems);
        },
      });
    }, 700);
  }

  deleteProductFromCart(productID: string) {
    this.loadingProductRemoval[productID] = true;
    this._cartService.deleteProductFromCart(productID).subscribe({
      next: (response) => {
        this.cart = response.data;
        this._cartService.cartItemsNum.next(response.numOfCartItems);
        this.loadingProductRemoval[productID] = false;
      },
    });
  }

  clearUserCart() {
    this.isClearLoading = true;
    this._cartService.clearUserCart().subscribe({
      next: (response) => {
        if (response.message === 'success') {
          if (this.cart) {
            this.cart?.products.splice(0, this.cart.products.length);
            this.cart.totalCartPrice = this.cart.totalCartPrice = 0;
            this._cartService.cartItemsNum.next(response.numOfCartItems);
          }
        }
        this.isClearLoading = false;
      },
    });
  }
}
