import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productForm: FormGroup;
  product!: Product;
  productId!: number;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productId: [{ value: 0, disabled: true }],
      productName: [{ value: '', disabled: true }, Validators.required],
      price: [
        { value: 0, disable: true },
        [Validators.required, Validators.min(0)],
      ],
      brand: [{ value: '', disabled: true }, Validators.required],
      quantity: [
        { value: 0, disable: true },
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
    if (this.productId) this.getProductDetails(this.productId);
  }

  getProductDetails(productId: number): void {
    this.productService.getProductDetails(productId).subscribe({
      next: (response) => this.patchTheProductForm(response),
      error: (err) => console.error(err),
      complete: () => this.cdr.detectChanges(),
    });
  }

  patchTheProductForm(product: Product) {
    this.productForm.patchValue({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      brand: product.brand,
      quantity: product.quantity,
    });
    this.disableFormControls();
    this.isEditing = false;
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.mapFormToModel();
      this.callSaveOrUpdate(
        product,
        product.productId !== undefined && product.productId !== null
      );
    }
  }

  mapFormToModel(): Product {
    const formValues = this.productForm.value;
    const product: Product = {
      productId: this.productForm.get('productId')?.value,
      productName: formValues.productName,
      price: formValues.price,
      brand: formValues.brand,
      quantity: formValues.quantity,
    };
    return product;
  }

  callSaveOrUpdate(product: Product, existingProduct: boolean) {
    if (existingProduct)
      this.productService.updateProduct(product).subscribe({
        next: (response) => this.patchTheProductForm(response),
        error: (err) => console.log(err),
        complete: () => this.cdr.detectChanges(),
      });
    else
      this.productService.createProduct(product).subscribe({
        next: (response) => this.patchTheProductForm(response),
        error: (err) => console.log(err),
        complete: () => this.cdr.detectChanges(),
      });
  }

  onCreateNew() {
    this.productForm.reset({
      productId: undefined,
      productName: '',
      price: 0,
      brand: '',
      quantity: 1,
    });
    this.productId = 0;
    this.enableFormControls();
    console.log('Creating a new product');
  }

  onUpdate() {
    this.enableFormControls();
    console.log(`In Edit Mode: ${this.isEditing}`);
  }

  disableFormControls() {
    this.productForm.get('productId')?.disable();
    this.productForm.get('productName')?.disable();
    this.productForm.get('brand')?.disable();
    this.productForm.get('price')?.disable();
    this.productForm.get('quantity')?.disable();
  }

  enableFormControls() {
    this.isEditing = true;
    this.productForm.get('productName')?.enable();
    this.productForm.get('brand')?.enable();
    this.productForm.get('price')?.enable();
    this.productForm.get('quantity')?.enable();
  }
}
