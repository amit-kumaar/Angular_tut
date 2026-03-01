import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Products } from '../services/products';
import { Product, Products as ProductsResponse } from '../../types';
import { ProductComponent } from '../components/product/product';
import { PaginatorModule,Paginator } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { EditPopup } from '../components/edit-popup/edit-popup';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ProductComponent, PaginatorModule, CommonModule,Paginator,EditPopup,ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(
    private productsService:Products,
    private cdr: ChangeDetectorRef
  ){}

  products:Product[] = [];
  loading = true;
  errorMessage = '';

  totalRecords:number=0;
  rows:number=5;

  displayEditPopup:boolean=false;
  displayAddPopup:boolean=false;

  toggleEditPopup(product:Product){
    this.selectedProduct=product;
    this.displayEditPopup=true;
  }
  toggleDeletePopup(product:Product){
    this.deleteProduct(product.id ?? 0);
  }

  toggleAddPopup(){
    this.displayAddPopup=true;
  }

  selectedProduct:Product={
    id:0,
    name:'',
    image:'',
    price:'',
    rating:0,
  };

  onConfirmEdit(product:Product){
    this.editProduct(product,this.selectedProduct.id ?? 0);
    this.displayEditPopup=false;
  }

  onConfirmAdd(product:Product){
    this.addProduct(product, 0);
    this.displayAddPopup=false;
  }

  OnProductOutput(product:Product){
    console.log(product,'Output')
  }

  onPageChange(event:any){
    this.fetchProducts(event.page,event.rows);
  }

  fetchProducts(page:number,perPage:number){
    this.loading = true;
    this.productsService
    .getProducts('http://localhost:3000/clothes',{page,perPage})
    .subscribe({
      next: (data:ProductsResponse)=>{
        console.log('API Response:', data);
        this.products=data.items || [];
        this.totalRecords=data.total || 0;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

   editProduct(product:Product,id:number){
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`,product).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.fetchProducts(0,this.rows);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
   }

   deleteProduct( id:number){
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.fetchProducts(0,this.rows);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
   }
   addProduct(product:Product,id:number){
    this.productsService.addProduct(`http://localhost:3000/clothes`,product).subscribe(
      {
        next:(data)=>{
          console.log(data);
          this.fetchProducts(0,this.rows);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
   }

  ngOnInit(){
      this.fetchProducts(0,this.rows);
      }
}

   