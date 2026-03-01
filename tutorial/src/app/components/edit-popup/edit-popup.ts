import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-edit-popup',
  imports: [DialogModule, CommonModule,FormsModule,RatingModule,ButtonModule],
  templateUrl: './edit-popup.html',
  styleUrl: './edit-popup.css',
})
export class EditPopup {
  @Input() display:boolean=false;
   @Input() header!:string;
  

  @Input()product:Product={
    name:'',
    image:'',
    price:'',
    rating:0,
  };

  @Output() confirm=new EventEmitter<Product>();

  onConfirm(){
    this.confirm.emit(this.product);
  }
  onCancel(){
    this.display=false;
  }
}
