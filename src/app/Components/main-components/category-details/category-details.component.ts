import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../services/products.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
  staggeredFadeRightAnimation,
  slideInAnimation,
} from '../../../animations/animations';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
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
    trigger('staggeredFadeRight', [
      transition(':enter', [
        useAnimation(staggeredFadeRightAnimation, { params: { time: '1s' } }),
      ]),
    ]),

    slideInAnimation,
  ],
})
export class CategoryDetailsComponent {
  categoryID: string = '';
  productDetails: Product | undefined;
  filteredProducts: Product[] = [];
  isLoading: boolean = true;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductsService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.categoryID = params.get('id')!;
    });

    this._productService.getProducts().subscribe({
      next: (response) => {
        this.filteredProducts = response.data.filter(
          (product: Product) => product.category._id === this.categoryID
        );
        this.isLoading = false;
      },
    });
  }
}
