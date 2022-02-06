import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  hide = true;
  
  constructor(private router: Router, private authService: AuthServiceService) {

   }

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      });
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  goToDashboard(){
    this.router.navigate(['/shoppingList']);
  }

  checkDetails(){
    if (!this.loginForm.valid) {
      return;
    }
    const val = this.loginForm.value;

    this.authService.login(val.email, val.password)
      .subscribe(
        (res) => {
            if(Object.values(res)[0]){
              this.router.navigate(['/shoppingList']);
              sessionStorage.setItem("name", Object.values(res)[1]);
            }
            else{
              alert('The Username or Password is Incorrect');
            }
        }
      );            
  }
}
