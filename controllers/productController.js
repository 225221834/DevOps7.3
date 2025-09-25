const Product = require('../models/Product');

// Controller to get products by category by filtering purpose
exports.getProducts = async (req, res) => {
  try {
    const category = req.query.category;// Get category from query string
    const filter = category ? { category } : {};// Build filter object
    const products = await Product.find(filter);// Fetch products from database
    res.json(products);// Return products as JSON 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });// Handle errors
  }
};

// Controller to add a new product (protected route for 'seller' users)
exports.addProduct = async (req, res) => {
  try {// Validate input data
    const { name, slug, price, category, image, description } = req.body;
    if (!name || !slug || !price || !category || !image || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check for existing product with the same slug
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product slug already exists' });
    }
    // Create and save the new product
    const product = new Product({ name, slug, price, category, image, description });
    await product.save();
    // Return the created product
    res.status(201).json({ product, message: 'Product added successfully' });
    // Handle errors
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};