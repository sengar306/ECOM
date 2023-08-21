import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import { SignUp } from '../datatype';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss', 'seller-auth.component.css']
})
export class SellerAuthComponent {
  constructor(private seller:SellerService,private router:Router){
  


  }  showLogin=false ; 
     autherror:string=' ';

  
  ngOnInit():void{
    this.seller.reloadSeller()
  }
signUp(data:SignUp):void{

this.seller.userSignup(data)

}
login(data:SignUp):void{
  this.autherror=" "
  this.seller.userLogin(data)
  this.seller.isloginError.subscribe((iserror)=>{
    if(iserror)
    {
        this.autherror="Email or password is not correct"
        
    }
  })

  }
  

openLogin(){
      this.showLogin=true
}
openSignup(){
  this.showLogin=false

}
}
