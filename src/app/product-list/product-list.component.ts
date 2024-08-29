import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => (this.products = response),
      error: (error) => console.error(error)
    });
  }
  viewProductDetails(productId:number): void {
    this.router.navigate([`/products/${productId}`]);
  }

}
