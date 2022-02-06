import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup} from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  hide = true;

  constructor(private router: Router, private authService: AuthServiceService) {  }

  public signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
      });
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.signupForm.controls[controlName].hasError(errorName);
  }
  goToDashboard(){
    this.router.navigate(['/shoppingList']);
  }

  signUp(){
    if(!this.signupForm.valid){
      return;
    }
    const val = this.signupForm.value;
    const name = this.signupForm.value.name;
    this.authService.signUp(val.name, val.email, val.password)
      .subscribe(
        (res) => {
            console.log("User is created");
            sessionStorage.setItem("name", name);
            this.router.navigate(['/shoppingList']);
        }
      );
  }

}
