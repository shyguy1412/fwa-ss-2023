import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FooterComponent } from './components/shop-footer/shop-footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestShopComponent } from './components/test-shop/test-shop.component';
import { TestProductCardComponent } from './components/test-product-card/test-product-card.component';
import { FormsModule } from '@angular/forms';
import { MeinKontoComponent } from './components/mein-konto/mein-konto.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { TestMyAccountComponent } from './components/test-my-account/test-my-account.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    ShopComponent,
    LandingPageComponent,
    FooterComponent,
    ProductCardComponent,
    NavbarComponent,
    TestShopComponent,
    TestProductCardComponent,
    MeinKontoComponent,
    CheckoutComponent,
    TestMyAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
