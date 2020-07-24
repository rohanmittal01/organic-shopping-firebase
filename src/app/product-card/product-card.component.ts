import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { }
  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.product);
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.product);
  }


  getQuantity(){
    if (!this.shoppingCart){
      return 0;
    }
    // tslint:disable-next-line: prefer-const
    let x: any = this.shoppingCart;
    let quantity = 0;
    if (this.shoppingCart[this.product.$key]){
    quantity = (this.shoppingCart[this.product.$key]).quantity;
    }
    return quantity;
  }
}
