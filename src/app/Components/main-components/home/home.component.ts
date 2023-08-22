import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
  slideInAnimation,
  staggeredFadeRightAnimation,
} from '../../../animations/animations';
import {
  trigger,
  transition,
  useAnimation,
  query,
  style,
  animate,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeInAnimation, { params: { time: '3s' } }),
      ]),
    ]),
    trigger('fadeOut', [
      transition(':leave', [useAnimation(fadeOutAnimation)]),
    ]),
    trigger('fadeRight', [
      transition(':enter', [useAnimation(fadeRightAnimation)]),
    ]),
    // trigger('staggeredFadeRight', [
    //   transition(':enter', [
    //     useAnimation(staggeredFadeRightAnimation, { params: { time: '1s' } }),
    //   ]),
    // ]),
    trigger('staggeredFadeRight', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(600, [animate('0.5s', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),

    slideInAnimation,
  ],
})
export class HomeComponent implements OnInit {
  productsArray: Product[] = [];
  searchTerm: string = '';
  isProductsLoading: boolean = true;

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this.productsArray = response.data;
        this.isProductsLoading = false;
      },
    });
  }
}
