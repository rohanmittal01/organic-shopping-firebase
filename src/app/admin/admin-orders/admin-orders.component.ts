import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/order.service';
import { getLocaleExtraDayPeriods } from '@angular/common';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  ordersArray = [];
  ordersData;
  constructor(private orderService: OrderService) {
    this.orderService.getOrders().snapshotChanges().pipe().subscribe(orders => {
      this.ordersData = orders.payload.val();
      console.log(orders.payload.val());
      this.pushOrdersIntoArray();
    });
   }

   pushOrdersIntoArray(){
      // tslint:disable-next-line: forin
      this.ordersArray = [];
      for (let orderId in this.ordersData){
        let date = this.ordersData[orderId].datePlaced;
       
        this.ordersArray.push({
          name: this.ordersData[orderId].shipping.name,
          date
        });
      }
      console.log(this.ordersArray);
   }
  ngOnInit(): void {

  }

}
