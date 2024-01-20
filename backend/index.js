const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const connect = require("./config");
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

// Middleware


app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

app.listen(PORT, (req, res) => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
