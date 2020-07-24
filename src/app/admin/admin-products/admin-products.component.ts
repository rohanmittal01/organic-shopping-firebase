import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  productListCollection: Observable<any[]>;
  products: any = [];
  filteredProducts: any[];
  subscribe: Subscription;
  
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'price', '$key'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  array: any;


  constructor(private productService: ProductService, private userService: UserService) {
    this.productService.getAll().snapshotChanges().subscribe(products => {
    this.array = products.map(item => {
      return {
        $key: item.key,
        ...item.payload.val() as {}
      };
    });
    this.listData = new MatTableDataSource(this.array);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
   });


   //  this.productListCollection = this.productService.getAll().snapshotChanges();
   //  this.subscribe = this.productService.getAll().valueChanges().subscribe(products => this.filteredProducts = this.products = products);
   // //  console.log(this.productListCollection);
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }
  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

    // filter(query: string){
  //   this.filteredProducts = (query) ? this.products.filter((p: Product) => {
  //     return p.title.toLowerCase().includes(query.toLowerCase());
  //   }) : this.products;

  //   console.log(this.filteredProducts);
  // }

  ngOnDestroy(){
    // this.subscribe.unsubscribe();
  }

  ngOnInit(): void {
  }

}
