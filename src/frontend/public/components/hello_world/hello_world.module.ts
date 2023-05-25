import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './hello_world.component';
import { AppRoutingModule } from '@frontend/public/app-routing.module';
import { ProductCards } from './ProductCards.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCards
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
