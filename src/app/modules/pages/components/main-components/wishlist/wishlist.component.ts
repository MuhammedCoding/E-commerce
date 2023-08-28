import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class WishlistComponent {
  isLoading: boolean = true;
  isAddLoading: boolean = false;
  products: Product[] = [];
  productsIds: string[] = [];
  isClearLoading: boolean = false;
  loadingProductRemoval: { [productId: string]: boolean } = {};
  private productCache: { [productId: string]: Product } = {};

  constructor(
    private _wishlistService: WishlistService,
    private toastr: ToastrService,
    private _cartService: CartService
  ) {}
  ngOnInit(): void {
    this._wishlistService.getWishList().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data;
        this.products.forEach((product) => {
          this.productCache[product.id] = product;
        });
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
        console.log(err);
        this.toastr.error('Sorry! something went wrong', 'Major Error', {});
      },
    });
  }

  deleteProductFromWishlist(productID: string) {
    this.loadingProductRemoval[productID] = true;
    this._wishlistService.deleteProductFromWishlist(productID).subscribe({
      next: (response) => {
        delete this.productCache[productID];
        this.products = Object.values(this.productCache);
        this.loadingProductRemoval[productID] = false;
      },
    });
  }
}
