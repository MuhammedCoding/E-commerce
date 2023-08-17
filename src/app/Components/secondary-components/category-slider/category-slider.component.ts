import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../services/products.service';
import { Category } from '../../../interfaces/category';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
  slideInAnimation,
  staggeredFadeRightAnimation,
} from '../../../animations/animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.css'],
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
export class CategorySliderComponent implements OnInit {
  constructor(private _productService: ProductsService) {}
  isLoading = true;
  categoriesArray: Category[] = [];
  ngOnInit(): void {
    this._productService.getCategories().subscribe({
      next: (response) => {
        this.categoriesArray = response.data;
        this.isLoading = false;
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 4,
      },
      740: {
        items: 5,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };
}
