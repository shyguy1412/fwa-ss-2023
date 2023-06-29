import { Injectable } from '@angular/core';
import { OrderDTO } from '@frontend/app/dto/OrderDTO';
import { orderApi } from '@frontend/lib/ApiInstances';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  async getOrders(): Promise<OrderDTO[]> {
    const response = await orderApi.ordersGet();
    console.log(response);
    
    return response.map(order => new OrderDTO(order));
  }
}
