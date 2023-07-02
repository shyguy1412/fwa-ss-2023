import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrease quantity when decreaseQuantity method is called', () => {
    const item = { id: 1, productSlug: 'product 1', productName: 'Product 1', amount: 2, price: 10, imageUrl: 'assets/images/Product 1.png', description: 'Ein Bündel Produkt 1'};
    component.cartItems = [item];
    component.decreaseQuantity(item);
    expect(item.amount).toBe(1);
  });

  it('should increase quantity when increaseQuantity method is called', () => {
    const item = { id: 1, productSlug: 'product 1', productName: 'Product 1', amount: 2, price: 10, imageUrl: 'assets/images/Product 1.png', description: 'Ein Bündel Produkt 1'};
    component.cartItems = [item];
    component.increaseQuantity(item);
    expect(item.amount).toBe(3);
  });
});
