import { Component, OnInit } from '@angular/core';
import { Login, SignUp, addProduct, cart } from '../datatype';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss','user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  
  showLogin:boolean=true
  authError:string="";
  constructor(private user:UserService,private product:ProductService) {}
  ngOnInit(): void {
    this.user.userAuthReload()
   
  }
  signUp(data:SignUp){
    console.warn(data);
    this.user.userSignUp(data)
  }
  login(data:Login){
   
   this.user.userLogin(data);
   this.user.userLogin(data)
   this.user.invalidUserAuth.subscribe((result)=>{
    if(result)
    {
      this.authError="Please enter a valid details"
    }
   })
   setTimeout(() => {
    
    this.product.getCartList(8)

   }, 2000);
 
   
   
    
  }
  
  openLogin(){
    this.showLogin=true;

  }
  openSignup(){
    this.showLogin=false;

  }
  localCartRemoteCart(){
    let data =localStorage.getItem('localCart');
    let users = localStorage.getItem('user');
    let userId = users && JSON.parse(users);
    console.warn(userId.id)
  
          
    
    if(data)
    { let cartDataList:addProduct[]=JSON.parse(data);
     
     cartDataList.forEach((product:addProduct,index)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId,
      }
      delete cartData.id;
     setTimeout(()=>
     {
      this.product.addToCart(cartData).subscribe((result)=>{
        if(result)
        {
          console.warn("item stored in Db")
        }
      
      })
      if(cartDataList.length===index+1)
      {
        localStorage.removeItem('localCart') 
      }
     },500)
     });
    }
  
   
      
    }
   
  }
  
