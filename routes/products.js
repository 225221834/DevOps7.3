const express = require('express');
const router = express.Router();

// Controllers and middleware
const productController = require('../controllers/productController');
// Authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

// Public route to get products, protected route to add products
router.get('/products', productController.getProducts);
// Protected route to add a new product (only for 'seller' users)
router.post('/products', authMiddleware, productController.addProduct);
// Export the router
module.exports = router;