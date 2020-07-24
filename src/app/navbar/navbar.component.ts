import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { AngularFireObject } from 'angularfire2/database';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
@Component({
  selector: 'bs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  cart$;
  shoppingCartItem: ShoppingCart;

  shoppingCartItemCount;
  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout(){
    this.auth.logout();
  }
gith
  async ngOnInit(){
    let cart$ = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
      // let x = this.shoppingCartItem.totalItemsCount(cart);
      // console.log(x);


      this.shoppingCartItemCount = 0;
      let cartData: any = cart.payload.val();
      // tslint:disable-next-line: forin
      for(let productId in cartData){
        this.shoppingCartItemCount += cartData[productId].quantity;
      }
     
      // this.shoppingCartItemCount = 0;
      // for(let productId in cart.payload.val().items){
      //   console.log(productId);
      //   this.shoppingCartItemCount+=(cart.payload.val().items)[productId].quantity;
      // }
     
      console.log(this.shoppingCartItemCount);
    });
    // this.shoppingCartItem.totalItemsCount().then((response: number) => this.shoppingCartItemCount = response);
    // console.log(this.shoppingCartItemCount);
  }





}
