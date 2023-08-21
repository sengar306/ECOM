import { Component, OnInit } from '@angular/core';
import { addProduct } from '../datatype';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss', 'seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productMessage: string | undefined;
  productData: addProduct | undefined;

  constructor(private route: ActivatedRoute, private product: ProductService) {
    this.productMessage = undefined;
    this.productData = undefined;
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    
      productId&&this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
    
  }

  submit(data: addProduct) {
    if (this.productData) {
      data.id = this.productData.id;
    }
  ``
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = "Product has been updated.";
      }
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
