import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { addProduct } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct:undefined|addProduct[]
  trendyProducts:undefined|addProduct[]
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product:ProductService){}
  ngOnInit(): void {
      this.product.popularProducts().subscribe((data)=>{
           
            this.popularProduct=data;
      })
  
  this.product.trendyProducts().subscribe((data)=>
  {
    this.trendyProducts=data;
  });
}


}
