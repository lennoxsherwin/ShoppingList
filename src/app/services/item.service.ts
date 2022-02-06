import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  _id: string;
  category: string;
  item_name: string;
  brand: string;
  remarks: string;
  uom: string;
  quantity: string;
  itemNeeded: boolean;
}

export class ItemObject implements Item {
  _id!: string;
  category!: string;
  item_name!: string;
  brand!: string;
  remarks!: string;
  uom!: string;
  quantity!: string;
  itemNeeded!: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  items$!: BehaviorSubject<Item[]>;
  // items: Array<Item> = [];
  items: Array<Item> = [];
  json_item: any = [];

  constructor(private http:HttpClient) {
    this.items$ = new BehaviorSubject<Item[]>([]);
    // this.items = itemsData;
    this.getJSON().subscribe(data => {
      this.items = data['item'];
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('http://localhost:8000/api/items');
  }

  getAll() {
    this.items$.next(this.items);
  }

  add(category: string, item_name: string, brand: string, remarks: string, uom: string, quantity: string, itemNeeded: boolean) {
    console.log("Going to post the data");
    return this.http.post('http://localhost:8000/api/items', 
    {category, item_name, brand, remarks, uom, quantity, itemNeeded}
    );
    // this.items.push(item);
  }

  edit(item: Item) {
    let findElem = this.items.find(p => p._id == item._id);
    findElem!.category = item.category;
    findElem!.item_name = item.item_name;
    findElem!.brand = item.brand;
    findElem!.remarks = item.remarks;
    findElem!.uom = item.uom;
    findElem!.quantity = item.quantity;
    /*this.http.put('http://localhost:8000/api/items/',                                       // 1. url
          {},                                                // 2. request body
          { params: { id: "61fcc2f1a75d4957fe447c62" } }   // 3. config object
    );*/
    this.items$.next(this.items);
  }

  remove(p_id: string) {
   
    this.items = this.items.filter(p => {
      return p._id != p_id
    });

    return this.http.delete('http://localhost:8000/api/items', 
    { params: { id: p_id } }
    );

    /*this.http.delete('http://localhost:8000/api/items/',
    { params: { id: "61fcf8393f73b12d5573628b" } }
    );*/
        // .subscribe(() => this.items$.next(this.items));
    
        // this.items$.next(this.items);
  }
}
