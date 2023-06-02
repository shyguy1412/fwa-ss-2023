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

  products = [
    {name: 'Thymian', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'assets/images/Thymian.png'},
    {name: 'Rosmarin', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'assets/images/Rosmarin.png'},
    {name: 'Basilikum', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'assets/images/Basilikum.png'},
    {name: 'Vanille', discount: '5' + '%', oldprice: '100' + '€', price: '95' + '€', image: 'assets/images/Vanille.png'},
    {name: 'Safran', discount: '50' + '%', oldprice: '50' + '€', price: '25' + '€', image: 'assets/images/Safran.png'},
    {name: 'Trüffel', discount: '5' + '%', oldprice: '110' + '€', price: '95' + '€', image: 'assets/images/Trüffel.png'},
    {name: 'Mahlab', discount: '' + '%', oldprice: '' + '€', price: '' + '€', image: 'assets/images/Mahlab.png'},



];


  constructor(public router:Router, private productService:ProductService){
  }

  async ngOnInit(){
    const thymian = await this.productService.getProduct('thymian');
  }
}
