import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent 
  },
  { 
    path: 'shoppingList', component: ShoppingListComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
