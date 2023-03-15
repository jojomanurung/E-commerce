import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.url;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get(this.baseUrl + `categories`);
  }

  getAllProducts(filter?: any) {
    return this.http.get(this.baseUrl + `products`, {params: filter});
  }

  getProductById(id: any) {
    return this.http.get(this.baseUrl + `products/${id}`);
  }
  
}
