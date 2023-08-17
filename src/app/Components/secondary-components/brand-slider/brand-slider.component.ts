import { Brand } from '../../../interfaces/brand';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../services/products.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
  staggeredFadeRightAnimation,
  slideInAnimation,
} from '../../../animations/animations';
import { trigger, transition, useAnimation } from '@angular/animations';

@Component({
  selector: 'app-brand-slider',
  templateUrl: './brand-slider.component.html',
  styleUrls: ['./brand-slider.component.css'],
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
export class BrandSliderComponent implements OnInit {
  constructor(private _productService: ProductsService) {}

  isLoading: boolean = true;

  brandsArray: Brand[] = [];
  ngOnInit(): void {
    this._productService.getBrands().subscribe({
      next: (response) => {
        this.brandsArray = response.data;
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
