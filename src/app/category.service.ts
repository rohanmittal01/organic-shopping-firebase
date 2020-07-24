import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }
  cat = [];
  getCategories(){
    console.log('the data is: ')
    console.log(this.db.list('/categories').snapshotChanges());
    return this.db.list('/categories');
  }
}
