const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//require('dotenv').config();
const productRoutes = require('../routes/products');
const authRoutes = require('../routes/auth');

const contactController = require('../controllers/contact'); //
const searchRoutes = require('../controllers/search');
const productsRoutes = require('../controllers/products');
const contactRoutes = require('../controllers/contact');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/contact', contactController); // Use controller directly for simple route
app.use('/api/search', searchRoutes);
app.use('/api/products', productsRoutes);// New products route
app.use('/api/contact', contactRoutes);
app.use('/api', productRoutes);// Product routes
app.use('/api/auth', authRoutes); // Auth routes 

module.exports = app;



