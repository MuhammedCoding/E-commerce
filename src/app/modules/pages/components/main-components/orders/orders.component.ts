import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../services/order.service';
import {fadeInAnimation, fadeOutAnimation, fadeRightAnimation} from "../../../../../animations/animations";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],

})
export class OrdersComponent implements OnInit {
  constructor(private _orderService: OrderService) {}
  ngOnInit(): void {
    this._orderService.getUserOrders().subscribe({
      next: (response) => console.log(response),
    });
  }
}
