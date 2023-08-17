import { CartService } from '../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private _tokenService: TokenService,
    private _cartService: CartService,
    private scroller: ViewportScroller,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.router.navigate(['/']);

    this._tokenService.userData.subscribe({
      next: () => {
        this.isLogin =
          this._tokenService.userData.getValue() === null ? false : true;
      },
    });

    this._cartService.cartItemsNum.subscribe({
      next: (value) => {
        this.cartItemCount = value;
      },
    });
  }
  logout() {
    this._tokenService.logout();
  }
}
