import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../services/products.service';
import { Product } from '../../../../../interfaces/product';

import AOS from 'aos';

import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],

})
export class HomeComponent implements OnInit {
  productsArray: Product[] = [];
  searchTerm: string = '';
  isProductsLoading: boolean = true;
  isActive: boolean = true;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  constructor(private _productsService: ProductsService) {}

  ngOnInit(): void {
    AOS.init();
    this._productsService.getProducts().subscribe({
      next: (response) => {
        this.productsArray = response.data;
        this.isProductsLoading = false;
      },
    });
  }

  ngAfterViewInit() {
    AOS.refreshHard();
  }
}
