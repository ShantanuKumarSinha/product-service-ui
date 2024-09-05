import { Component } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  addProductForm : FormGroup;
  isEditing = true;
  constructor(private formBuilder : FormBuilder, private productService :ProductService) {
    this.addProductForm = this.formBuilder.group({
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
    })};

    onSubmit() {
      if (this.addProductForm.valid) {
        const product: Product = this.mapFormToModel();
        this.productService.createProduct(product).subscribe({
          next :(response) => console.log(response),
          error : (err) => console.log(err),
          complete : () => console.log("Created")
        });
      }
    }

    mapFormToModel(): Product {
      const formValues = this.addProductForm.value;
      const product: Product = {
        productName: formValues.productName,
        price: formValues.price,
        brand: formValues.brand,
        quantity: formValues.quantity,
      };
      return product;
    }


}
