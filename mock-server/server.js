const express = require('express');
const cors = require('cors');
const app = express();
const port = 8081;

app.use(cors());

app.use(express.json());


// new API route: GET /products, returning a list of products
app.get('/productService/api/v1/product', (request, response) => {
    response.json([
      { productId: 1, productName: 'Iphone15', brand: 'Apple', price: 150000, quantity : 100 },
      { productId: 2, productName: 'Iphone14', brand: 'Apple', price: 140000, quantity : 100 }
    ]);
  });

  app.get('/productService/api/v1/product/1', (request, response) => {
    response.json(
      { productId: 1, productName: 'Iphone15', brand: 'Apple', price: 150000, quantity : 100 }
    );
  });

  app.post('/productService/api/v1/product', (request, response) => {
    const product = request.body.product;
    product.productId = Math.floor(Math.random() * 1000); // Mock an ID
    product.price *=10;
    response.json(product);
});

app.put('/productService/api/v1/product', (request, response) => {
  const product = request.body.product; 
  response.json(product);
});

// Start the server
app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});