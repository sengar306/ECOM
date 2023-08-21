import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addProduct } from '../datatype';


@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss','seller-add-product.css']
})
export class SellerAddProductComponent implements OnInit {
 addproductmessage: string | undefined;
  
  constructor(private product:ProductService){}
ngOnInit(): void {
    
}
submit(data:addProduct)
{ 
 this.product.addProduct(data).subscribe((result)=>{
    console.warn(result);
    if(result)
    {
      this.addproductmessage="product is succesfully added";
    }
    setTimeout(()=>(this.addproductmessage=undefined),3000);
  });
}
}

