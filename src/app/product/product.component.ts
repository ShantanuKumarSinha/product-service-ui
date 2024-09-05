import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() productForm: FormGroup;
  @Input() isEditing!: boolean;
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
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
    if (this.isEditing) this.enableFormControls();
    else this.disableFormControls();
  }

  enableFormControls() {
    this.productForm.get('productName')?.enable();
    this.productForm.get('price')?.enable();
    this.productForm.get('quantity')?.enable();
    this.productForm.get('brand')?.enable();
  }

  disableFormControls() {
    this.productForm.get('productName')?.disable();
    this.productForm.get('price')?.disable();
    this.productForm.get('quantity')?.disable();
    this.productForm.get('brand')?.disable();
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.formSubmit.emit();
    }
  }
}
