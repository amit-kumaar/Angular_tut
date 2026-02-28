import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [RatingModule,FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductComponent implements OnInit {
 @Input() product!:Product;
 @Output() productOutput : EventEmitter<Product>= new EventEmitter<Product>();
  ngOnInit(){
    this.productOutput.emit(this.product);
  }
}
