import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit{

  // tslint:disable-next-line: no-input-rename
  totalPrice = 0;
  shoppingCartItemCount = 0;
  productIdCollection: any[];
  cartData;
  subscription1: Subscription;
   constructor(private router: Router, private shoppingCartService: ShoppingCartService) { }

   async ngOnInit(){
     this.subscription1 = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
      this.cartData = cart.payload.val();
      this.getShoppingCartItemCount();
      this.getTotalPrice();
      this.getProductId(cart);
    
    });
   }

   getProductId(cart){
    if (cart) {
    this.productIdCollection = Object.keys(this.cartData);
    }
  }

   getShoppingCartItemCount(){
    ////////////////// Getting number of items in shopping cart
    this.shoppingCartItemCount = 0;
    // tslint:disable-next-line: forin
    for (let productId in this.cartData) {
      this.shoppingCartItemCount += this.cartData[productId].quantity;
    }
 }

   getTotalPrice(){
    this.totalPrice = 0;
    // tslint:disable-next-line: forin
    for (let productId in this.cartData) {
      this.totalPrice += (this.cartData[productId].product.price*this.cartData[productId].quantity);
    }
   // console.log(this.totalPrice);
  }
}
