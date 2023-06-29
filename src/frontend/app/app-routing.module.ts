import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@frontend/app/components/landing-page/landing-page.component';
import { ShopComponent } from '@frontend/app/components/shop/shop.component';
import { ShoppingCartComponent } from '@frontend/app/components/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/shop-footer/shop-footer.component';
import { TestShopComponent } from './components/test-shop/test-shop.component';
import { TestProductCardComponent } from './components/test-product-card/test-product-card.component';
import { MeinKontoComponent } from './components/mein-konto/mein-konto.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'test-shop', component: TestShopComponent },
  { path: 'test-product', component: TestProductCardComponent },
  { path: 'mein-konto', component: MeinKontoComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
