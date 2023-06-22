import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@frontend/app/components/landing-page/landing-page.component';
import { ShopComponent } from '@frontend/app/components/shop/shop.component';
import { ShoppingCartComponent } from '@frontend/app/components/shopping-cart/shopping-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/shop-footer/shop-footer.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
