import { Component } from '@angular/core';
import { Products } from '../services/products';
import { Products as ProductsResponse } from '../../types';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(
    private productsService:Products

  ){}

  ngOnInit(){
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page:0,perPage:5})
    .subscribe((products:ProductsResponse)=>{
      console.log(products.items);
    });
  }
}
