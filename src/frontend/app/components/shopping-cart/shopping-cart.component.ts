// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-shopping-cart',
//   templateUrl: './shopping-cart.component.html',
//   styleUrls: ['./shopping-cart.component.css']
// })
// export class ShoppingCartComponent {

//   products = [
//     {name: 'Thymian', discount: 0 + '%', oldprice: 80 + '€', price: 50 + '€', image: 'assets/images/Thymian.png', amount: '1kg'},
//     {name: 'Rosmarin', discount: 15 + '%', oldprice: 9 + '€', price: 7.65 + '€', image: 'assets/images/Rosmarin.png', amount: '1kg'},
//     {name: 'Basilikum', discount: 15 + '%', oldprice: 11 + '€', price: 9.35 + '€', image: 'assets/images/Basilikum.png', amount: '1kg'},
//     {name: 'Vanille', discount: 5 + '%', oldprice: 218 + '€', price: 207.1 + '€', image: 'assets/images/Vanille.png', amount: '1kg'},
//     {name: 'Safran', discount: 50 + '%', oldprice: 50 + '€', price: 25 + '€', image: 'assets/images/Safran.png', amount: '1kg'},
//     {name: 'Trüffel', discount: 5 + '%', oldprice: 110 + '€', price: 95 + '€', image: 'assets/images/Trüffel.png', amount: '1kg'},
//     {name: 'Mahlab', discount: 0 + '%', oldprice: 80 + '€', price: 80 + '€', image: 'assets/images/Mahlab.png', amount: '1kg'},
// ];

// }

import { Component } from '@angular/core';
import { ProductOrder, ProductOrderDTO } from '@frontend/app/dto/ProductOrderDTO';
import { orderApi } from '@frontend/lib/ApiInstances';
import { Product } from '@frontend/lib/api_client';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  // cartItems: any[] = [
  //   { name: 'Product 1', quantity: 2, price: 10 },
  //   { name: 'Product 2', quantity: 1, price: 15 },
  //   { name: 'Product 3', quantity: 3, price: 8 }
  // ];

  cartItems: ProductOrderDTO[] = [];

  ngOnInit() {
    const products = JSON.parse(localStorage.getItem('shopping-cart') ?? '[]') as ProductOrder[];
    this.cartItems = products.map(product => new ProductOrderDTO(product));
  }

  decreaseQuantity(item: ProductOrderDTO): void {
    if (item.amount > 1) {
      item.amount--;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
  }

  increaseQuantity(item: ProductOrderDTO): void {
    item.amount++;
    localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
  }

  removeFromCart(item: ProductOrderDTO): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
  }

  calculateTotal(): string {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.amount * item.price;
    }
    return total.toFixed(2);
  }

  async checkout() {
    if (this.cartItems.length == 0) return;
    await orderApi.ordersPost({
      order: {
        shippingMethod: 'express',
        paymentMethod: 'PayPal',
        userId: 1,
        products: this.cartItems.map(product => ({
          id: product.id,
          amount: product.amount
        }))
      }
    });
    localStorage.removeItem('shopping-cart');
    window.location.assign('/mein-konto');
    // Implement the checkout logic here
    // console.log('Checkout initiated');
  }
}
