import { Component } from '@angular/core';

interface Product {
  name: string;
  image: string;
  discount: number;
  oldprice: number;
  price: number;
}



@Component({
  selector: 'app-test-shop',
  templateUrl: './test-shop.component.html',
  styleUrls: ['./test-shop.component.css']
})


export class TestShopComponent {
  products: Product[] = [
    {name: 'Thymian', discount: 0, oldprice: 80, price: this.calculatePriceWithDiscount(80, 0), image: 'assets/images/Thymian.png'},
    {name: 'Rosmarin', discount: 15, oldprice: 9, price: this.calculatePriceWithDiscount(9, 15), image: 'assets/images/Rosmarin.png'},
    {name: 'Basilikum', discount: 15, oldprice: 11, price: this.calculatePriceWithDiscount(11, 15), image: 'assets/images/Basilikum.png'},
    {name: 'Vanille', discount: 5, oldprice: 218, price: this.calculatePriceWithDiscount(218, 5), image: 'assets/images/Vanille.png'},
    {name: 'Safran', discount: 10, oldprice: 1100, price: this.calculatePriceWithDiscount(1100, 10), image: 'assets/images/Safran.png'},
    {name: 'Trüffel', discount: 5, oldprice: 110, price: this.calculatePriceWithDiscount(110, 5), image: 'assets/images/Trüffel.png'},
    {name: 'Mahlab', discount: 0, oldprice: 80, price: this.calculatePriceWithDiscount(80, 0), image: 'assets/images/Mahlab.png'},
  ];


  calculatePriceWithDiscount(oldPrice: number, discount: number): number {
    const discountedPrice = oldPrice - (oldPrice * (discount / 100));
    return discountedPrice;
  }

  filteredProducts: Product[] = [];
  searchQuery: string = '';

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  cartItems: { name: string, discount: number, oldprice: number, price: number, image: string, amount: string, quantity: number }[] = [];   

  addToCart(product: { name: string, price: number }): void {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = {
        name: product.name,
        quantity: 1,
        price: product.price,
        discount: 0, // Add default value if needed
        oldprice: 0, // Add default value if needed
        image: '', // Add default value if needed
        amount: '', // Add default value if needed
      };
      this.cartItems.push(newItem);
    }
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  calculateTotal() {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.quantity * item.price;
    }
    return total;
  }

  checkout() {
    // Implement your checkout logic here
  }

  constructor() {
    this.filterProducts();
  }
}
