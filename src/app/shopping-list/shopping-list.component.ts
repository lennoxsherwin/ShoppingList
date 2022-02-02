import { Component, AfterViewInit,ViewChild,OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatTableDataSource, MatTable } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ItemObject, ItemService } from '../services/item.service';
import { Item } from '../services/item.service';
import { ItemFormDialogComponent } from './item-form-dialog/item-form-dialog.component';
import { FormControl } from '@angular/forms';

export interface GroupBy {
  category: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  // styleUrls: ['./shopping-list.component.css','./table.scss']
  styleUrls: ['./table.scss']
})
export class ShoppingListComponent implements AfterViewInit,OnInit, OnDestroy {

  // itemData: item[] = [];
  displayedColumns: string[] = ['select', 'category', 'item_name', 'brand', 'remarks', 'uom', 'quantity', 'action', 'actions'];
  // dataSource = new MatTableDataSource<item>(items);

  selection = new SelectionModel<Item>(true, []);
  
  private serviceSubscribe!: Subscription;
  dataSource: MatTableDataSource<Item>;
  
  // constructor(public dialog: MatDialog, private itemService: itemServiceService ) { }
  constructor(private itemService: ItemService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Item>();
  }

  addItem(){
    
  }

  edit(data: Item) {
    const dialogRef = this.dialog.open(ItemFormDialogComponent, {
      width: '420px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.remove(id);
      }
    });
  }

  isGroup(index: any, item: any){
    return item.category;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    /*
    this.itemService.getJSON().subscribe(data => {
      // console.log(data);
      this.itemData = data;
      console.log(this.itemData);
      console.log(items);
    });*/
    this.itemService.getAll();
    this.serviceSubscribe = this.itemService.items$.subscribe(res => {
      this.dataSource.data = res;
    })
  }
  showAll: Boolean = true;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  list_id = sessionStorage.getItem('list_id');
  list_name = sessionStorage.getItem('list_name');
  list_description = sessionStorage.getItem('list_description');

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.item_name + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selected = "allItems";
  listSelect = new FormControl();
  toggleList(){
    if(this.showAll){
      this.showAll = false;
    }
    else{
      this.showAll = true;
    }
  }

  showAllItems(){
    this.showAll = true;
  }

  showCartItems(){
    this.showAll = false;
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}

