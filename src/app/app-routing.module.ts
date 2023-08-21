import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/main-components/home/home.component';
import { CartComponent } from './Components/main-components/cart/cart.component';
import { RegisterComponent } from './Components/main-components/register/register.component';
import { LoginComponent } from './Components/main-components/login/login.component';
import { NotFoundComponent } from './Components/secondary-components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './Components/main-components/product-details/product-details.component';
import { CheckoutComponent } from './Components/main-components/checkout/checkout.component';
import { OrdersComponent } from './Components/main-components/orders/orders.component';
import { ProfileComponent } from './Components/main-components/profile/profile.component';
import { CategoryDetailsComponent } from './Components/main-components/category-details/category-details.component';
import { WishlistComponent } from './Components/main-components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './Components/main-components/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },

  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent,
  },
  {
    path: 'checkout/:cartID',
    canActivate: [AuthGuard],
    component: CheckoutComponent,
  },
  {
    path: 'allorders',
    canActivate: [AuthGuard],
    component: OrdersComponent,
  },
  {
    path: 'wishlist',
    canActivate: [AuthGuard],
    component: WishlistComponent,
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  {
    path: 'productdetails/:id',
    canActivate: [AuthGuard],
    component: ProductDetailsComponent,
  },
  {
    path: 'categorydetails/:id',
    canActivate: [AuthGuard],
    component: CategoryDetailsComponent,
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
