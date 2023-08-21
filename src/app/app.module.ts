import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/main-components/home/home.component';
import { AboutComponent } from './Components/main-components/about/about.component';
import { CartComponent } from './Components/main-components/cart/cart.component';
import { FooterComponent } from './Components/main-components/footer/footer.component';
import { LoginComponent } from './Components/main-components/login/login.component';
import { NavbarComponent } from './Components/main-components/navbar/navbar.component';
import { NotFoundComponent } from './Components/secondary-components/not-found/not-found.component';
import { RegisterComponent } from './Components/main-components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './Components/secondary-components/product-card/product-card.component';
import { ProductDetailsComponent } from './Components/main-components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategorySliderComponent } from './Components/secondary-components/category-slider/category-slider.component';
import { BrandSliderComponent } from './Components/secondary-components/brand-slider/brand-slider.component';
import { SearchPipe } from './Pipes/search.pipe';
import { CheckoutComponent } from './Components/main-components/checkout/checkout.component';
import { OrdersComponent } from './Components/main-components/orders/orders.component';
import { ProfileComponent } from './Components/main-components/profile/profile.component';
import { CategoryDetailsComponent } from './Components/main-components/category-details/category-details.component';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './Components/secondary-components/loader/loader.component';
import { WishlistComponent } from './Components/main-components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './Components/main-components/forget-password/forget-password.component';
import { ResetNewPasswordComponent } from './Components/secondary-components/reset-new-password/reset-new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
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
    ForgetPasswordComponent,
    ResetNewPasswordComponent,
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
