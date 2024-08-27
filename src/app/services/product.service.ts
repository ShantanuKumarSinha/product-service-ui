import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Product } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.productServiceUrl;

  constructor(private httpClient : HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    const productUrl = this.apiUrl+'product';
    return this.httpClient.get<Product[]>(productUrl);
  }
}
