import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart{
    //  shoppingCartItemCount: number;
  // tslint:disable-next-line: align
  items: ShoppingCartItem[];
    // constructor(private shoppingCartService: ShoppingCartService){
    // }


    // totalItemsCount(cart: any){
    //   let shoppingCartItemCount = 0;
    //   let cartData: any = cart.payload.val();
    //   // tslint:disable-next-line: forin
    //   for(let productId in cartData){
    //     shoppingCartItemCount += cartData[productId].quantity;
    //   }
    //   return shoppingCartItemCount;
    // }


    // async totalItemsCount(){
    //   let shoppingCartItemCount = 0;
    //   (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart => {
    //     // let x = this.shoppingCartItem.totalItemsCount(cart);
    //     // console.log(x);
    //     let cartData: any = cart.payload.val();
    //     // tslint:disable-next-line: forin
    //     for(let productId in cartData){
    //       shoppingCartItemCount += cartData[productId].quantity;
    //     }
    //   });
    //   return shoppingCartItemCount;
    // }

}