import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from '@frontend/app/components/landing-page/landing-page.component';
import { ShopComponent } from '@frontend/app/components/shop/shop.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'shop', component: ShopComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
