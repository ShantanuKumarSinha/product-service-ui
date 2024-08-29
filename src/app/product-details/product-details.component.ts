import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product! : Product;
  constructor(private route : ActivatedRoute, private productService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    if(productId)
      this.getProductDetails(productId);
  }


  getProductDetails(productId : number): void {
    this.productService.getProductDetails(productId).subscribe({
      next : (response) => this.product = response,
      error : (err) => console.error(err),
      complete : () => this.cdr.detectChanges()
    }
    ) 
  }
}
