import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addProduct } from '../datatype';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss','seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {


   productList: undefined | addProduct[]
   productMessage:undefined|string;
   icon=faTrash;
   editicon=faEdit;
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.list();
    
   


  }
   deleteProduct(id:number){
    this.product.deleteProduct(id).subscribe((result)=>{
      console.warn("test id ",id);
     if(result)
     {
      this.productMessage="product is delete";
      this.list();
     }
    })
       setTimeout(()=>{
        this.productMessage=undefined},3000);
       }
       list()
       {
        this.product.productList().subscribe((result)=>{
          console.warn(result)
          if(result){
          this.productList=result;
          }
        })
       }
      
   }

