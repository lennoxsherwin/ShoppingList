import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item, ItemObject } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-form-dialog',
  templateUrl: './item-form-dialog.component.html',
  styleUrls: ['./item-form-dialog.component.css']
})
export class ItemFormDialogComponent implements OnInit {

  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<ItemFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) {
    this.formInstance = new FormGroup({
      "_id":  new FormControl(''),
      "category":  new FormControl(''),
      "item_name": new FormControl('', Validators.required),
      "brand": new FormControl(''),
      "remarks": new FormControl(''),
      "uom": new FormControl(''),
      "quantity": new FormControl(''),
      "itemNeeded": new FormControl('')
    });

    this.formInstance.setValue(data);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.dialogRef.close(Object.assign(new ItemObject(), this.formInstance.value));
  }

}
