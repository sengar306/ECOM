import { CanActivate, CanActivateFn, mapToCanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private sellerService:SellerService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Place your authentication logic here
    if(localStorage.getItem('seller'))
    {
      return true
    }
    return this.sellerService.isSellerLoggedIn; // Return true if the user is authenticated or false if not
  }
}