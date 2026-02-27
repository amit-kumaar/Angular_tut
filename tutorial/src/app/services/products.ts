import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { PaginationParams, Products as ProductsResponse } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private apiService:Api) {}

  getProducts=(
    url:string,
    params:PaginationParams):Observable<ProductsResponse>=>{
    return this.apiService.get(url,{
      params,
      responseType:'json',
    });
  }
}
