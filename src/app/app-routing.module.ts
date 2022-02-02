import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  } ,
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'login', component: LogInComponent
  },
  { 
    path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) 
  }, 
  { 
    path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) 
  }, 
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
