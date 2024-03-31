import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  columnDefs : ColDef[] = [
    {headerName: 'Product Id', field: 'productId', type: 'number'},
    {headerName: 'Product Name', field: 'productName'},
    {headerName: 'Brand', field: 'brand'},
    {headerName: 'Quantity', field: 'quantity'},
    {headerName: 'Price', field: 'price'}
  ]


  rowData=[{productId: 1, productName: 'Test', brand: 'Test Brand', qunatity : 10, price : 1000}]

}
