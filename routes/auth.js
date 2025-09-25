const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes for user registration and login
router.post('/register', authController.register);
router.post('/login', authController.login);
// Export the router
module.exports = router;