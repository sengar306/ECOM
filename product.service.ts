import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { addProduct, cart } from '../datatype';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cart(cartData: cart) {
    throw new Error('Method not implemented.');
  }
 
  cartData=new EventEmitter<addProduct[]| []>()
  constructor(private http:HttpClient) { }
  addProduct(data:addProduct){
  return   this.http.post('http://localhost:3000/product',data)
  
  } 
 
  getProduct(id:string) {
    return this.http.get<addProduct>(`http://localhost:3000/product/${id}`)
  }
  productList(){
    return this.http.get<addProduct[]>("http://localhost:3000/product");
  }
  deleteProduct(id:number)
  {
   return this.http.delete(`http://localhost:3000/product/${id}`)
  }
  updateProduct(product:addProduct){
  
    return this.http.put<addProduct>(`http://localhost:3000/product/${product.id}`,product);
    console.warn(product);
  }
  popularProducts(){
    return this.http.get<addProduct[]>("http://localhost:3000/product?_limit=5'");

  }
  trendyProducts()
  {
    return this.http.get<addProduct[]>("http://localhost:3000/product?_limit=8");
  }
  searchProducts(query:string)
  {
    return this.http.get<addProduct[]>(`http://localhost:3000/product?q=${query}`);
  }
   localAddToCart(data:addProduct)
   {
    let cardData=[];
    let localCart=localStorage.getItem('localCart')
    if(!localCart)
    {
      localStorage.setItem('localCart',JSON.stringify([data]))
    }
    else{
      cardData=JSON.parse(localCart);
      cardData.push(data)
      localStorage.setItem('localCart',JSON.stringify(cardData))
    
    }
    this.cartData.emit(cardData)
   }
   removeItemCart(product:number){
    let cartData=localStorage.getItem('localCart')
    if(cartData)
    {
      let items:addProduct[]=JSON.parse(cartData)
      items=items.filter((items:addProduct)=>product!==items.id)
      localStorage.setItem('localCart',JSON.stringify(items))
      this.cartData.emit(items)
      
    }
   }
   addToCart(cartData:cart){
    return  this.http.post('http://localhost:3000/cart',cartData);
   }
   getCartList(userId: number) {
    console.warn(userId)
    return this.http.get<addProduct[]>('http://localhost:3000/cart?userId='+userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        console.warn(result)
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
    }
  }

  
