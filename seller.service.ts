import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isloginError=new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignup(data: SignUp) {
    this.http.post("http://localhost:3000/seller", data, { observe: 'response' }).subscribe((response) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(response.body));
      this.router.navigate(['seller-home']);
      console.warn(data);
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: Login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
       
      } else {
        console.warn("user not logged in");
        this.isloginError.emit(true)
        
      }
    });
   
  }
}
