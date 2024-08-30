export interface Product {
    productId?: number; // Optional for create operations, typically auto-generated
    productName: string; // Name of the product
    price: number; // Price of the product
    brand: string; // Brand of the product
    quantity: number;
    imageUrl?: URL;// Quantity in stock
  }