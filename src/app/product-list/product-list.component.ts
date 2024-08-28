import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: []
})
export class ProductListComponent implements OnInit{

  products : Product[] =[];
  constructor(private productService : ProductService){}

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }

  getProducts(): void{
    this.productService.getAllProducts().subscribe((response)=>{
      console.log(response)
      this.products = response;
    },
  (error)=>{
    console.error('Error fetching response',error);
  })
  }

}
