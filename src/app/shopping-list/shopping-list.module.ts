import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialExampleModule } from 'src/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent } from './shopping-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ItemFormDialogComponent } from './item-form-dialog/item-form-dialog.component';
import { ItemAddDialogComponent } from './item-add-dialog/item-add-dialog.component';
@NgModule({
  declarations: [
    ShoppingListComponent,
    ItemFormDialogComponent,
    ItemAddDialogComponent,
  ],
  imports: [
    CommonModule,
    ShoppingListRoutingModule,
    MatExpansionModule,
    MaterialExampleModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    ItemService
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class ShoppingListModule { }
