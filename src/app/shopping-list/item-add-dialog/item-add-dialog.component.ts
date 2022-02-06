import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, ItemObject } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-add-dialog',
  templateUrl: './item-add-dialog.component.html',
  styleUrls: ['./item-add-dialog.component.css']
})
export class ItemAddDialogComponent implements OnInit {

  formInstance!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ItemAddDialogComponent>) {
    this.formInstance = new FormGroup({
      "_id":  new FormControl(''),
      "category":  new FormControl(''),
      "item_name": new FormControl('', Validators.required),
      "brand": new FormControl(''),
      "remarks": new FormControl(''),
      "uom": new FormControl(''),
      "quantity": new FormControl(''),
      "itemNeeded": new FormControl(false)
    });
  }
  
  ngOnInit(): void {

  }

  save(): void {
    if(!this.formInstance.valid){
      return;
    }
    this.dialogRef.close(Object.assign(new ItemObject(), this.formInstance.value));
  }

}
