import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private _orderService: OrderService) {}
  ngOnInit(): void {
    this._orderService.getUserOrders().subscribe({
      next: (response) => console.log(response),
    });
  }
}
