import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Product } from '../models/product.model';
import { CreateOrUpdateProductDetailsRequestDto } from '../models/create-update-product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.productServiceUrl;
  private productsUrl = this.apiUrl + 'product';

  constructor(private httpClient : HttpClient) { }

  getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.productsUrl);
  }

  getProductDetails(productId: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.productsUrl}/${productId}`);
  }

  createProduct(product : Product): Observable<Product>{
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const productRequestDto : CreateOrUpdateProductDetailsRequestDto ={
      email: '',
      password: '',
      product: product
    }
    return this.httpClient.post<Product>(this.productsUrl, productRequestDto, {headers});
  }

  updateProduct(product : Product): Observable<Product>{
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const productRequestDto : CreateOrUpdateProductDetailsRequestDto = {
      email: '',
      password: '',
      product: product
    };
 
    return this.httpClient.put<Product>(this.productsUrl, productRequestDto,{headers});
  }
}
