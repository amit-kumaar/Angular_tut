import { Component, OnInit } from '@angular/core';
import { Products } from '../services/products';
import { Product, Products as ProductsResponse } from '../../types';
import { ProductComponent } from '../components/product/product';

@Component({
  selector: 'app-home',
  imports: [ProductComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private productsService:Products

  ){}

  products:Product[] = [];

  OnProductOutput(product:Product){
    console.log(product,'Output')
  }

  ngOnInit(){
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page:0,perPage:5})
    .subscribe({
      next: (products:ProductsResponse)=>{
        console.log('Data received:', products);
        this.products=products.items;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}

   