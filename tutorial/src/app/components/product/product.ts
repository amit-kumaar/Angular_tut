import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating'
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  imports: [RatingModule,FormsModule,ButtonModule],
  providers:[ConfirmationService],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent implements OnInit {
  constructor(private confirmationService:ConfirmationService){ }
 @ViewChild('deleteButton') deleteButton:any;
 @Input() product!:Product;
 @Output() edit : EventEmitter<Product>= new EventEmitter<Product>();
 @Output() delete:EventEmitter<Product>=new EventEmitter<Product>();


 editProduct(){
    this.edit.emit(this.product);
 }
 confirmDelete(){
   this.confirmationService.confirm({
    target: this.deleteButton.nativeElement,
    message:'Are you sure that you want to delete this product?',
    header:'Confirmation',
    icon:'pi pi-exclamation-triangle',
    accept:()=>{
      this.deleteProduct();
    },
   });
 }
 deleteProduct(){
    this.delete.emit(this.product);
 }

  ngOnInit(){

  }
}
