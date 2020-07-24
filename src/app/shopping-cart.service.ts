import { Injectable } from '@angular/core';
// import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import { take } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
// import { ShoppingCart } from './models/shopping-cart';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

   async getCart(){//: Promise<AngularFireObject<ShoppingCart>>{
   let cartId = await this.getOrCreateCartId();
   return this.db.object('/shopping-carts/' + cartId + '/items');
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  async  addToCart(product: Product){
    // console.log(product);
    this.updateItemQuantity(product, 1);
   
  }
  async removeFromCart(product: Product){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.exists()) {
        item$.update({quantity: item.payload.val().quantity + change});
      }else{
        item$.set({product: {title: product.title, price: product.price, category: product.category, imageUrl: product.imageUrl}, quantity: 1});
      }
     // console.log(item.payload.val());
    //  if(change == -1){ 
    //  if(item.payload.val().quantity == 0){
    //    // console.log("Quantity is 0");
    //    // console.log(this.getItem(cartId,product.$key));
    //     this.getItem(cartId,product.$key).remove;
    //   }
    // }
    });
  
  }

  async addFromShoppingCart(productId){
    this.updateItemQuantityFromShoppingCart(productId, 1);
   // console.log(productId);
  }

  async removeFromShoppingCart(productId){
    this.updateItemQuantityFromShoppingCart(productId, -1);
  }

  private async updateItemQuantityFromShoppingCart(productId: string, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, productId);
   // console.log(item$);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = item.payload.val().quantity + change
        item$.update({quantity: quantity});
        if(quantity == 0){
          this.db.object('/shopping-carts/' + cartId + '/items/' + productId).remove();
        }
    });
  }
 

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (cartId){
      return cartId;
    }
    // else
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }
}
