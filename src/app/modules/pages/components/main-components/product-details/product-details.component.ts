import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../../services/products.service';
import { Product } from '../../../../../interfaces/product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],

})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  productDetails: Product | undefined;
  isLoading: boolean = true;
  isAddLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductsService,
    private _cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
    });

    this._productService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data;
        this.isLoading = false;
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      // 400: {
      //   items: 2,
      // },
      // 740: {
      //   items: 3,
      // },
      // 940: {
      //   items: 4,
      // },
    },
    nav: true,
  };
}
