import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: any;
  cartData;
  shoppingCartItemCount: number;
  totalPrice: number;
  dataRetrived = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  productIdCollection: any[];
  async ngOnInit() {
    this.dataRetrieval().then(x =>  this.dataRetrived = true);
    // console.log(this.productIdCollection);

}

async dataRetrieval(){
  this.cart$ = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
    // let x = this.shoppingCartItem.totalItemsCount(cart);
    // console.log(x);
    //console.log(cart);
    this.cartData = cart.payload.val();
    this.getProductId(cart);
    this.getShoppingCartItemCount();
    this.getTotalPrice();
  });

}

  getShoppingCartItemCount(){
     ////////////////// Getting number of items in shopping cart
     this.shoppingCartItemCount = 0;
     // tslint:disable-next-line: forin
     for (let productId in this.cartData) {
       this.shoppingCartItemCount += this.cartData[productId].quantity;
     }
  }

  getProductId(cart){
    if (cart.payload.val()) {
    this.productIdCollection = Object.keys(this.cartData);
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
  
  addToCart(product){
    this.shoppingCartService.addFromShoppingCart(product);
  }
  removeFromCart(product){
    this.shoppingCartService.removeFromShoppingCart(product);
  }

  clearCart(){
    this.shoppingCartService.clearCart();

  }

}
