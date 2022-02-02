import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  item_id: number;
  category: string;
  item_name: string;
  brand: string;
  remarks: string;
  uom: string;
  quantity: string;
  itemNeeded: boolean;
}

export class ItemObject implements Item {
  item_id!: number;
  category!: string;
  item_name!: string;
  brand!: string;
  remarks!: string;
  uom!: string;
  quantity!: string;
  itemNeeded!: boolean;
}

const itemsData: Item [] = [
  {
    "item_id" : 1, "category" : "Fruits", "item_name" : "Apple", "brand" : "Gala", "remarks" : "Red apple", "uom" : "1 kg", "quantity" : "1", "itemNeeded" : false 
  },
  {
    "item_id" : 2, "category" : "Fruits", "item_name" : "Banana", "brand" : "", "remarks" : "", "uom" : "", "quantity" : "12", "itemNeeded" : true
  },
  {
    "item_id" : 3, "category" : "Dairy", "item_name" : "Milk", "brand" : "Aavin", "remarks" : "Orange colour packet", "uom" : "1/2 litre", "quantity" : "3", "itemNeeded" : false 
  },
  {
    "item_id" : 4, "category" : "Dairy", "item_name" : "Cheese", "brand" : "Amul", "remarks" : "slices", "uom" : "", "quantity" : "10", "itemNeeded" : true
  },
  {
    "item_id" : 5, "category" : "Dairy", "item_name" : "Butter", "brand" : "Amul", "remarks" : "salted", "uom" : "200gm", "quantity" : "2", "itemNeeded" : true
  },
  {
    "item_id" : 6, "category" : "Vegetables", "item_name" : "Potato", "brand" : "", "remarks" : "", "uom" : "1kg", "quantity" : "2", "itemNeeded" : false
  },
  {
    "item_id" : 7, "category" : "Vegetables", "item_name" : "Capsicum", "brand" : "", "remarks" : "red colour", "uom" : "1/2kg", "quantity" : "1", "itemNeeded" : true
  },
];

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items$!: BehaviorSubject<Item[]>;
  items: Array<Item> = [];

  constructor() {
    this.items$ = new BehaviorSubject<Item[]>([]);
    this.items = itemsData;
  }

  getAll() {
    this.items$.next(this.items);
  }

  add(item: Item) {
    this.items.push(item);
  }

  edit(item: Item) {
    let findElem = this.items.find(p => p.item_id == item.item_id);
    findElem!.category = item.category;
    findElem!.item_name = item.item_name;
    findElem!.brand = item.brand;
    findElem!.remarks = item.remarks;
    findElem!.uom = item.uom;
    findElem!.quantity = item.quantity;
    this.items$.next(this.items);
  }

  remove(id: number) {
   
    this.items = this.items.filter(p => {
      return p.item_id != id
    });

    this.items$.next(this.items);
  }
}
