import { CartService } from '../../../../../services/cart.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartItemCount: number = 0;
  isCartCountLoading: boolean = true;

  constructor(
    private _tokenService: TokenService,
    private _cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/']);

    this._tokenService.userData.subscribe({
      next: () => {
        this.isLogin =
          this._tokenService.userData.getValue() === null ? false : true;
        this.cdr.markForCheck();
        this._cartService.updateCartItemsNum();
      },
    });

    this._cartService.cartItemsLoading.subscribe((loading) => {
      this.isCartCountLoading = loading;
      this.cdr.markForCheck();
    });

    this._cartService.cartItemsNum.subscribe({
      next: (value) => {
        this.cartItemCount = value;
        this.cdr.markForCheck();
      },
    });
  }

  logout() {
    this._tokenService.logout();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
