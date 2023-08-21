import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { addProduct, cart } from '../datatype';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss','product-details.css']
})
export class ProductDetailsComponent implements OnInit{
  productData:undefined | addProduct;
  productQuantity:number=1;
  removeCart=false;
  constructor(private activeRoute:ActivatedRoute,private product:ProductService)
  {
   
  }
  ngOnInit(): void {
  
    let product =this.activeRoute.snapshot.paramMap.get('productId');
   
    product && this.product.getProduct(product).subscribe((result)=>{
       this.productData=result;
       let cartData=localStorage.getItem('localCart');
       if(product && cartData)
       {
        let items=JSON.parse(cartData)
        items=items.filter((items:addProduct)=>
          product==items.id.toString()
        ) 
        if(items.length){
          this.removeCart=true
        }
        else{
          this.removeCart=false
        }
        
       }
    })
  }
  


handleQuantity(val:string)
  {
     if(this.productQuantity<20 && val==='plus')
     {
      this.productQuantity+=1
     }
     else if(this.productQuantity>1 && val==='min'){
      
      this.productQuantity-=1
     }
  }
  AddToCart()
  {
    {
      if (this.productData) {
        this.productData.quantity = this.productQuantity;
        if (!localStorage.getItem('user')) {
          this.product.localAddToCart(this.productData);
          this.removeCart = true;
        } else {
          let users = localStorage.getItem('user');
          let userId = users && JSON.parse(users);
          console.warn(userId.id)
          
          let cartData: cart = {
            ...this.productData,
            userId,
            productId: this.productData.id,
          };
          delete cartData.id;
         
          this.product.addToCart(cartData).subscribe((result) => {
            alert("product is added in cart")
          });
        }
      }
    }
    
}
RemoveToCart(product:number)
{
this.product.removeItemCart(product)
this.removeCart=false
}

}