const express = require('express');
const userController = require('../controller/user');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Getting all users
router.get('/', userController.getAllUsers);

// Register a user
router.post('/signup', userController.signup);

// Login a user
router.post('/login', userController.login);

// Update a user (User must be logged in)
router.patch('/', auth, userController.updateUser)

// Getting book list of an user
router.get('/books', auth, userController.getBooklist)

module.exports = router;