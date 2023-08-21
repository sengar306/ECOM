import { Component, OnInit } from'@angular/core' ;
import{Router} from '@angular/router';
import { ProductService } from '../services/product.service';
import { addProduct } from '../datatype';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss','header.component.css']
})
export class HeaderComponent implements OnInit {
logout: any;
sellerName:string="";
userName:string="";
 cardItems=0;
  constructor(private route:Router ,private product:ProductService){

  }
  menuType:String='default'
  searchResult:undefined|addProduct[]
  ngOnInit(): void {
      this.route.events.subscribe((val:any)=>{
        if(val.url){
          if(localStorage.getItem('seller') && val.url.includes('seller'))
          { console.warn("seller area")
            this.menuType='seller'
            if(localStorage.getItem('seller')){
              let sellerStore=localStorage.getItem('seller');
              let sellerData=sellerStore && JSON.parse(sellerStore)[0];
              this.sellerName=sellerData.name
            }
          }
          else if(localStorage.getItem('user')){
            let userStore=localStorage.getItem('user');
            let userData=userStore && JSON.parse(userStore);
            this.userName=userData.username
            this.menuType='user'
            
          }
          else{
            this.menuType="default"
            console.warn("outside seller")
          }
          
        }
      });
      let cardData=localStorage.getItem('localCart')
      if(cardData)
      {
        this.cardItems=JSON.parse(cardData).length
      }
      this.product.cartData.subscribe((items)=>
      {
       this.cardItems=items.length
      })
    
  }
  Logout()
      {
        localStorage.removeItem('seller');
        this.route.navigate(['/']);
      }
      searchProduct(query:KeyboardEvent)
      {
        if(query)
        {
          const element=query.target  as  HTMLInputElement;
         
          this.product.searchProducts(element.value).subscribe((results)=>{
           
            if(results.length>5)
            {
            results.length=3;
            }this.searchResult=results;
          
            
          })
           
          }
          
        }
        hideSearch()
        {
          this.searchResult=undefined;
        }
        submitSearch(val:string)
        {
          console.warn(val)
          this.route.navigate([`search/${val}`])
  
        }
        redirectToDetails(id:number){
          this.route.navigate(['/details/'+id])
        }
    
        userLogout()
        {
          localStorage.removeItem('user');
          this.route.navigate(['/user-auth']);
        }
      }
      

