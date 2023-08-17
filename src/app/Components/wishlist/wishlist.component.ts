import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  isLoading: boolean = true;
  isRemoveLoading: boolean = false;
  isAddLoading: boolean = false;

  products: Product[] = [];
  productsIds: string[] = [];

  constructor(
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private toastr: ToastrService,
    private _productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this._wishlistService.getWishList().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data;
      },
    });
  }

  deleteProductFromWishlist(productID: string) {
    this._wishlistService.deleteProductFromWishlist(productID).subscribe({
      next: (response) => {
        this.isRemoveLoading = false;
        this.productsIds = response.data;
      },
    });
  }

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
}
