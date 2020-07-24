import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories: any[];
  subscribe2: Subscription;
  // tslint:disable-next-line: no-input-rename
  @Input('category') category: any;
  
  constructor(private categoryService: CategoryService) { 
    this.subscribe2 = categoryService.getCategories().snapshotChanges().subscribe(categories => {
      this.categories = categories.map((item) => {
        return {
          $key: item.key,
          ...(item.payload.val() as {}),
        };
      });
      console.log(this.categories);
    });
  }

  ngOnDestroy(){
    // this.subscribe2.unsubscribe();
  }

  ngOnInit(): void {
  }

}
