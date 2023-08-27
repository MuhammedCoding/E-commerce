import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/pages/components/main-components/home/home.component';
import { AboutComponent } from './modules/pages/components/main-components/about/about.component';
import { CartComponent } from './modules/pages/components/main-components/cart/cart.component';
import { FooterComponent } from './modules/pages/components/main-components/footer/footer.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { NavbarComponent } from './modules/pages/components/main-components/navbar/navbar.component';
import { NotFoundComponent } from './modules/pages/components/secondary-components/not-found/not-found.component';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './modules/pages/components/secondary-components/product-card/product-card.component';
import { ProductDetailsComponent } from './modules/pages/components/main-components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategorySliderComponent } from './modules/pages/components/secondary-components/category-slider/category-slider.component';
import { BrandSliderComponent } from './modules/pages/components/secondary-components/brand-slider/brand-slider.component';
import { SearchPipe } from './Pipes/search.pipe';
import { CheckoutComponent } from './modules/pages/components/main-components/checkout/checkout.component';
import { OrdersComponent } from './modules/pages/components/main-components/orders/orders.component';
import { ProfileComponent } from './modules/pages/components/main-components/profile/profile.component';
import { CategoryDetailsComponent } from './modules/pages/components/main-components/category-details/category-details.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './modules/pages/components/secondary-components/loader/loader.component';
import { WishlistComponent } from './modules/pages/components/main-components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CategorySliderComponent,
    BrandSliderComponent,
    SearchPipe,
    CheckoutComponent,
    OrdersComponent,
    ProfileComponent,
    CategoryDetailsComponent,
    LoaderComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
