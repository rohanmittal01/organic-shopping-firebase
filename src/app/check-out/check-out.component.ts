import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import {map} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  totalPrice = 0;
  shipping: any = {};
  subscription1: Subscription;
  authSubscription: Subscription;
  cartData;
  cart: any[] = [];
  userId: string;
  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {

    this.subscription1 = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
      this.cartData = cart.payload.val();
      this.getTotalPrice();
    });

    this.authSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    })
  }

  getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (let productId in this.cartData) {
      this.totalPrice += (this.cartData[productId].product.price*this.cartData[productId].quantity);
    }
   // console.log(this.totalPrice);
  }

  async checkOutPressed(f){
    console.log(f.value);
    this.getCartArray();
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart
      //  this.cartData.map(i => {
      //   return {
      //     product: {
      //       title: i.product.title,
      //       imageUrl: i.product.imageUrl,
      //       price: i.product.price
      //     },
      //     quantity: i.quantity,
      //     totalPrice: i.quantity * i.product.price
      //   }
      // })
    };
    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);

    // this.orderService.storeOrder(order);
  }

  getCartArray(){
    // tslint:disable-next-line: forin
    for(var ele in this.cartData){
      this.cart.push({
        product: {
          title: this.cartData[ele].product.title,
          imageUrl: this.cartData[ele].product.imageUrl,
          price: this.cartData[ele].product.price
        },
        quantity: this.cartData[ele].quantity,
        totalPrice: this.cartData[ele].product.price * this.cartData[ele].quantity
      })
    }
   // console.log(this.cart);
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.authSubscription.unsubscribe();
  }

}
