import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  addUser: boolean = false;

  public shoppingLists: any = [
    {
      "shopping_list_id": "1", "list_name": "Grocery Shopping", "list_description": "All the grocery products can be added to this particular list.", "last_updated_by":"Lennox", "last_updated_dt": "2022-01-20"
    },
    {
      "shopping_list_id": "2", "list_name": "Electronics Shopping", "list_description": "All the electronic products can be added to this particular list.", "last_updated_by":"Lennox", "last_updated_dt": "2022-01-20"
    },
    {
      "shopping_list_id": "3", "list_name": "To Do List", "list_description": "All the various tasks to do can be added to this particular list.", "last_updated_by":"Lennox", "last_updated_dt": "2022-01-20"
    },
    {
      "shopping_list_id": "4", "list_name": "Task List", "list_description": "All the tasks can be added to this particular list.", "last_updated_by":"Lennox", "last_updated_dt": "2022-01-20"
    }
  ];
  
  ngOnInit(): void {
      
  }
  
  goToShoppingList(e:Event,shoppingList:any){
    e.preventDefault();
  
    sessionStorage.setItem('list_id',shoppingList.shopping_list_id);
    sessionStorage.setItem('list_name',shoppingList.list_name);
    sessionStorage.setItem('list_description',shoppingList.list_description);

    this.router.navigateByUrl('/shoppingList');
  }

  addShoppingList(e:Event){
    e.preventDefault();
    this.addUser = true;
    // this.router.navigate(['/dashboard/addList']);
  }

}
