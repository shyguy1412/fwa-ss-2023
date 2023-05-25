import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './hello_world.component.html',
  styleUrls: ['./hello_world.component.css']
})

export class AppComponent {
  title = 'hello-world';

  products = [
    {name: 'Thymian', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'src/frontend/assets/images/Thymian.png'},
    {name: 'Rosmarin', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'src/frontend/assets/images/Rosmarin.png'},
    {name: 'Basilikum', discount: '15' + '%', oldprice: '70' + '€', price: '50' + '€', image: 'src/frontend/assets/images/Basilikum.png'},
    {name: 'Vanille', discount: '5' + '%', oldprice: '100' + '€', price: '95' + '€', image: 'src/frontend/assets/images/Vanille.png'},
    {name: 'Safran', discount: '50' + '%', oldprice: '50' + '€', price: '25' + '€', image: 'src/frontend/assets/images/Safran.png'},
    {name: 'Trüffel', discount: '5' + '%', oldprice: '110' + '€', price: '95' + '€', image: 'src/frontend/assets/images/Trueffel.png'},
    {name: 'Mahlab', discount: '' + '%', oldprice: '' + '€', price: '' + '€', image: 'src/frontend/assets/images/Mahlab.png'},



];


  constructor(public router:Router){
  }
}
