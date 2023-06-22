import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@frontend/app/services/product.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public addamountClass;
  public subamountClass;
  public currqu: number;

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

      this.currqu = 1;

      this.addamountClass = {
        "addquantity": this.currqu = this.currqu + 1,
      };

      this.subamountClass = {
        "subquantity": this.currqu = this.currqu -1
      };


      // make command to remove product if 0 amount is selected or hide "less"-button at 1

  }

  

  async ngOnInit(){
    const thymian = await this.productService.getProduct('thymian');
  }
}

