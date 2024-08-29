import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' }
];
