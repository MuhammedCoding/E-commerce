import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../../interfaces/product';
import { ProductsService } from '../../../../../services/products.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],

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
