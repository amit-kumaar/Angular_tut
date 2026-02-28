import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable } from 'rxjs';
import { PaginationParams, Products as ProductsResponse } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class Products {
  constructor(private api:Api) {}

  // Getting products from the API
  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<ProductsResponse> => {
    return this.api.get(url, {
      params,
      responseType: 'json',
    });
  };

  // Adding a product via the API
  addProduct = (url: string, body: any): Observable<any> => {
    return this.api.post(url, body, {});
  };

  // Editing a product via the API
  editProduct = (url: string, body: any): Observable<any> => {
    return this.api.put(url, body, {});
  };

  // Deleting a product via the API
  deleteProduct = (url: string): Observable<any> => {
    return this.api.delete(url, {});
  };
}
