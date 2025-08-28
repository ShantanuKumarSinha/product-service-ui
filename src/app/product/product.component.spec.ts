import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductComponent, ReactiveFormsModule],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should initialize the form with default values and disabled state', () => {
  const form = component.productForm;

  expect(form.get('productId')?.value).toBe(0);
  expect(form.get('productId')?.disabled).toBeTrue();

  expect(form.get('productName')?.value).toBe('');
  expect(form.get('productName')?.disabled).toBeTrue();

  expect(form.get('price')?.value).toBe(0);
  expect(form.get('price')?.disabled).toBeTrue();

  expect(form.get('brand')?.value).toBe('');
  expect(form.get('brand')?.disabled).toBeTrue();

  expect(form.get('quantity')?.value).toBe(0);
  expect(form.get('quantity')?.disabled).toBeTrue();
});

  it('should enable form controls when isEditing is true', () => {
    component.isEditing = true;
    component.ngOnInit();

    expect(component.productForm.get('productName')?.enabled).toBeTrue();
    expect(component.productForm.get('price')?.enabled).toBeTrue();
    expect(component.productForm.get('quantity')?.enabled).toBeTrue();
    expect(component.productForm.get('brand')?.enabled).toBeTrue();
  });

  it('should disable form controls when isEditing is false', () => {
    component.isEditing = false;
    component.ngOnInit();

    expect(component.productForm.get('productName')?.disabled).toBeTrue();
    expect(component.productForm.get('price')?.disabled).toBeTrue();
    expect(component.productForm.get('quantity')?.disabled).toBeTrue();
    expect(component.productForm.get('brand')?.disabled).toBeTrue();
  });

  it('should emit formSubmit event when form is valid and submitted', () => {
    // Set up the spy
    spyOn(component.formSubmit, 'emit');

    // Enable the form controls
    component.productForm.get('productName')?.enable();
    component.productForm.get('price')?.enable();
    component.productForm.get('brand')?.enable();
    component.productForm.get('quantity')?.enable();

    // Set valid values for the form
    component.productForm.setValue({
      productId: 1, // This field is disabled, so it won't affect validity
      productName: 'Test Product',
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });

    // Call the onSubmit method
    component.onSubmit();

    // Verify that the formSubmit event was emitted
    expect(component.formSubmit.emit).toHaveBeenCalled();
  });

  it('should not emit formSubmit event when form is invalid', () => {
    spyOn(component.formSubmit, 'emit');

    component.productForm.setValue({
      productId: 1,
      productName: '', // Invalid because productName is required
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });

    component.onSubmit();

    expect(component.formSubmit.emit).not.toHaveBeenCalled();
  });
});
