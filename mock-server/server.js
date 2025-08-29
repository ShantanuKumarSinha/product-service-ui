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

// Mock data for Morgan Stanley interview question
const mockData = {
  pages: 2,
  "total-number-of-pages": 10,
  total: 20,
  data: [
    { 
      cityName: "Bangalore",
      estimateCost: 350,
      userRating: {
        averageRating: 4.5,
        vote: 130
      }
    },
    {
      cityName: "Bangalore",
      estimateCost: 250,
      userRating: {
        averageRating: 4.2,
        vote: 120
      }
    },
    {
      cityName: "Bangalore",
      estimateCost: 300,
      userRating: {
        averageRating: 4.8,
        vote: 80
      }
    },
    {
      cityName: "Bangalore",
      estimateCost: 300,
      userRating: {
        averageRating: 4.8,
        vote: 100
      }
    }
  ]
};

app.get('/outlets', (req, res) => {
  const { cityName } = req.query;

  // Simulate a small delay (optional)
  setTimeout(() => {
    const filteredData = cityName
      ? mockData.data.filter(item => item.cityName.toLowerCase() === cityName.toLowerCase())
      : mockData.data;
    res.json({
      ...mockData,
      data: filteredData,
      total: filteredData.length
    });
  }, 1000);
});

// Start the server
app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});