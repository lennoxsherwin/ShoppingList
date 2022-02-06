import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs';

export interface UserLogIn{
  email: String,
  password: String
}

export interface UserSignUp{
  name: String,
  email: String,
  password: String
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  /*login(email:string, password:string ) {
    return this.http.post<UserLogIn>('http://localhost:8000/api/login', {email, password}).pipe(
        shareReplay()
    )
  }*/
  login( email:string, password:string ) {
    return this.http.post<UserLogIn>('http://localhost:8000/api/login', {email, password});
  }

  signUp(name: string, email:string, password:string){
    return this.http.post<UserSignUp>('http://localhost:8000/api/signup', {name, email, password}).pipe(
      shareReplay()
    ) 
  }
}
