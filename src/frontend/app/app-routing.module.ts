import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@frontend/app/components/landing-page/landing-page.component';
import { ShoppingCartComponent } from '@frontend/app/components/shopping-cart/shopping-cart.component';
import { TestShopComponent } from './components/test-shop/test-shop.component';
import { TestMyAccountComponent } from './components/test-my-account/test-my-account.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shop', component: TestShopComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'test-shop', component: TestShopComponent },
  { path: 'mein-konto', component: TestMyAccountComponent},
  { path: 'test-account', component: TestMyAccountComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
