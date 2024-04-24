const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db-connect');

// ROUTES
const categoryRoutes = require('./routes/category');
const foodItems = require('./routes/food-items');
const orders = require('./routes/orders');

const server = express();
connectDB();

server.use(express.json());
server.use(cors());

server.use('/category', categoryRoutes);
server.use('/food-items', foodItems);
server.use('/orders', orders);

const port = process.env.PORT || 8080;

server.listen(port, () => console.log(`Server is listining on ${port}`));
