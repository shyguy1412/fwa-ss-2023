import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product-service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './hello_world.component.html',
  styleUrls: ['./hello_world.component.css']
})

export class AppComponent {
  title = 'hello-world';

  public myVar: string;
  public amountClasses;


  products = [
    {name: 'Thymian', discount: 0 + '%', oldprice: 80 + '€', price: 50 + '€', image: 'assets/images/Thymian.png', amount: '1kg'},
    {name: 'Rosmarin', discount: 15 + '%', oldprice: 9 + '€', price: 7.65 + '€', image: 'assets/images/Rosmarin.png', amount: '1kg'},
    {name: 'Basilikum', discount: 15 + '%', oldprice: 11 + '€', price: 9.35 + '€', image: 'assets/images/Basilikum.png', amount: '1kg'},
    {name: 'Vanille', discount: 5 + '%', oldprice: 218 + '€', price: 207.1 + '€', image: 'assets/images/Vanille.png', amount: '1kg'},
    {name: 'Safran', discount: 50 + '%', oldprice: 50 + '€', price: 25 + '€', image: 'assets/images/Safran.png', amount: '1kg'},
    {name: 'Trüffel', discount: 5 + '%', oldprice: 110 + '€', price: 95 + '€', image: 'assets/images/Trüffel.png', amount: '1kg'},
    {name: 'Mahlab', discount: 0 + '%', oldprice: 80 + '€', price: 80 + '€', image: 'assets/images/Mahlab.png', amount: '1kg'},
];




  constructor(public router:Router, private productService:ProductService){

    // constructor(){
      this.myVar = this.products[1].discount;
    
      this.amountClasses = {
        "discount_visible": this.myVar > 0 + '%' ? true : false,
        "discount_invisible": this.myVar <= 0 + '%' ? true : false
      };
    //}

    // make command to remove product if 0 amount is selected or hide "less"-button at 1

  }

  

  async ngOnInit(){
    const thymian = await this.productService.getProduct('thymian');
  }
}
