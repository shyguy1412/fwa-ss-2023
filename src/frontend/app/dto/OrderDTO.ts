import { Order, OrderPaymentMethodEnum, OrderProductsInner, OrderShippingMethodEnum } from "@frontend/lib/api_client";

export class OrderDTO implements Required<Order>{
  id: number;
  shippingMethod: OrderShippingMethodEnum;
  paymentMethod: OrderPaymentMethodEnum;
  userId: number;
  products: OrderProductsInner[];
  orderDate: string;

  constructor(order: Order) {
    if (!order.id) throw new Error('Invalid Order Id');
    if (!order.shippingMethod) throw new Error('Invalid Shipping Method');
    if (!order.paymentMethod) throw new Error('Invalid Payment Method');
    if (!order.userId) throw new Error('Invalid User ID');
    if (!order.products) throw new Error('Invalid Products Array');
    if (!order.orderDate) throw new Error('Invalid Order Date');

    this.id = order.id;
    this.shippingMethod = order.shippingMethod;
    this.paymentMethod = order.paymentMethod;
    this.userId = order.userId;
    this.products = order.products;
    this.orderDate = order.orderDate;
  }

  total() {
    return this.products.reduce((prev, cur) => prev + (cur.price! * cur.amount!), 0);
  }

  formattedDate(){
    return `${(new Date(this.orderDate)).toLocaleDateString()} ${(new Date(this.orderDate)).toLocaleTimeString()}`
  }

}