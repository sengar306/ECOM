import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Login, SignUp } from '../datatype';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService  {
  invalidUserAuth=new EventEmitter<boolean>(false)
  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(user:SignUp){
    console.warn(user);
    this.http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result)=>{
      console.warn(result)
      if(result)
      {
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/'])
      }
    })
  }
  
  userAuthReload(){
    if(localStorage.getItem('user'))
    {
      this.router.navigate(['/'])
    }
  }
userLogin(data:Login)
  { 
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length)
      {
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
        this.router.navigate(['/']);
      }
      else{
           this.invalidUserAuth.emit(true)

      }
    })

  }
  
}
