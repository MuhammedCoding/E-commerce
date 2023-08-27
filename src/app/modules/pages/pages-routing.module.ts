import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { HomeComponent } from './components/main-components/home/home.component';
import { CartComponent } from './components/main-components/cart/cart.component';
import { CheckoutComponent } from './components/main-components/checkout/checkout.component';
import { OrdersComponent } from './components/main-components/orders/orders.component';
import { WishlistComponent } from './components/main-components/wishlist/wishlist.component';
import { ProfileComponent } from './components/main-components/profile/profile.component';
import { ProductDetailsComponent } from './components/main-components/product-details/product-details.component';
import { CategoryDetailsComponent } from './components/main-components/category-details/category-details.component';
import { NotFoundComponent } from './components/secondary-components/not-found/not-found.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
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

      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
