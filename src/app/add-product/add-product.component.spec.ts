import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AddProductComponent } from './add-product.component';
import { ProductService } from '../services/product.service';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['createProduct']);

    await TestBed.configureTestingModule({
      imports: [AddProductComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.addProductForm;
    expect(form.get('productId')?.value).toBe(0);
    expect(form.get('productName')?.value).toBe('');
    expect(form.get('price')?.value).toBe(0);
    expect(form.get('brand')?.value).toBe('');
    expect(form.get('quantity')?.value).toBe(0);
  });

  it('should map form values to product model correctly', () => {
    component.addProductForm.setValue({
      productId: 1,
      productName: 'Test Product',
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });

    const product = component.mapFormToModel();

    expect(product).toEqual({
      productName: 'Test Product',
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });
  });

  it('should call createProduct on ProductService when form is valid', () => {
    const mockProduct = {
      productName: 'Test Product',
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    };

    productServiceSpy.createProduct.and.returnValue(of(mockProduct));

    component.addProductForm.setValue({
      productId: 1,
      productName: 'Test Product',
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });

    component.onSubmit();

    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('should not call createProduct on ProductService when form is invalid', () => {
    component.addProductForm.setValue({
      productId: 1,
      productName: '', // Invalid because productName is required
      price: 100,
      brand: 'Test Brand',
      quantity: 10,
    });

    component.onSubmit();

    expect(productServiceSpy.createProduct).not.toHaveBeenCalled();
  });
});
