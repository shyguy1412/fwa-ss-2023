import { Component } from '@angular/core';
import { ProductDTO } from '@frontend/app/dto/ProductDTO';
import { ProductOrder, ProductOrderDTO } from '@frontend/app/dto/ProductOrderDTO';
import { ProductService } from '@frontend/app/services/product.service';

@Component({
  selector: 'app-test-shop',
  templateUrl: './test-shop.component.html',
  styleUrls: ['./test-shop.component.css']
})


export class TestShopComponent {
  products: ProductDTO[] = [];
  cartItems: ProductOrderDTO[] = [];

  constructor(public productService: ProductService) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
    // this.products.reverse();
    this.filterProducts();
    const cart = JSON.parse(localStorage.getItem('shopping-cart') ?? '[]') as ProductOrder[];
    this.cartItems = cart.map(product => new ProductOrderDTO(product));
  }

  calculatePriceWithDiscount(oldPrice: number, discount: number): number {
    const discountedPrice = oldPrice - (oldPrice * (discount / 100));
    return discountedPrice;
  }

  filteredProducts: ProductDTO[] = [];
  searchQuery: string = '';

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addToCart(product: ProductDTO): void {
    const existingItem = this.cartItems.find(item => item.productName === product.productName);
    if (existingItem) {
      existingItem.amount++;
    } else {
      const newItem:ProductOrderDTO = {
        productName: product.productName,
        price: product.price,
        amount: 1,
        id: product.id,
        productSlug: product.productSlug,
        imageUrl: product.imageUrl,
        description: product.description
      };
      this.cartItems.push(newItem);
    }
    localStorage.setItem('shopping-cart', JSON.stringify(this.cartItems));
  }

  decreaseQuantity(item: ProductOrderDTO): void {
    if (item.amount > 1) {
      item.amount--;
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
      total += item.amount * item.price;
    }
    return total;
  }

  checkout() {
    // Implement your checkout logic here
  }

  // constructor() {
  //   this.filterProducts();
  // }
}
