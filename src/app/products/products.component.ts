import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  
  
  productListCollection: any[];
  subscribe1: Subscription;
  category: string;
  filteredProducts: Product[] = [];
  cart: any;
  cartSubscription: Subscription;


  async ngOnInit(){
    this.cartSubscription = (await this.shoppingCartService.getCart()).snapshotChanges().subscribe(cart =>
      { this.cart = cart.payload.val();
        // console.log(this.cart);
      });
  }

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) {

    this.subscribe1 = this.productService.getAll().snapshotChanges().subscribe((products) => {
        
      this.productListCollection = products.map((item) => {
          return {
            $key: item.key,
            ...(item.payload.val() as {}),
          };
        });
        // console.log(this.productListCollection);
        this.filter();
      });
  }

  filter(){
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.productListCollection.filter((p: { category: string; }) => p.category.toLowerCase() == this.category.toLowerCase()) :
        this.productListCollection;
      // console.log(this.category);
     //  console.log(this.filteredProducts);
    });
  }


  ngOnDestroy(){
    this.subscribe1.unsubscribe();
    this.cartSubscription.unsubscribe();

  }


}
