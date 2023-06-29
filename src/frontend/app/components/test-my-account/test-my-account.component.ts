import { Component } from '@angular/core';
import { OrderDTO } from '@frontend/app/dto/OrderDTO';
import { OrderService } from '@frontend/app/services/order.service';

@Component({
  selector: 'app-test-my-account',
  templateUrl: './test-my-account.component.html',
  styleUrls: ['./test-my-account.component.css']
})
export class TestMyAccountComponent {

  orders: OrderDTO[] = [];

  constructor(public orderService: OrderService) { }

  async ngOnInit() {
    const orders = await this.orderService.getOrders();
    this.orders = orders.map(order => new OrderDTO(order));
  }

}
