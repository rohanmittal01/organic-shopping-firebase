import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: any;
  product: any = {};
  id;
  private subscribe1: Subscription;
  private subscribe2: Subscription;
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router,
              private categoryService: CategoryService, private productService: ProductService) 
    {
      this.subscribe1 = categoryService.getCategories().valueChanges().subscribe(categories => {
      this.categories$ = categories;
      });

      this.id = this.route.snapshot.paramMap.get('id');

      if (this.id){
        this.subscribe2 = this.productService.get(this.id).valueChanges().subscribe(p => {
          this.product = p;
          console.log(this.product);
        });
      }
    }

  save(product: any){
    // console.log(product);
    if (this.id){
      this.productService.update(this.id, product);
    }else{
    this.productService.create(product);
    }

    this.router.navigate(['/admin/products']);
  }

  delete(){
    if (confirm('Are you sure you want to delete this product?')){
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    }
  }

  

  ngOnDestroy(): void {
    // this.subscribe1.unsubscribe();
    // this.subscribe2.unsubscribe();
  }


  ngOnInit(): void {
  }

}
