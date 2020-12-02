const express = require('express');
const bookController = require('../controller/book');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Getting all books
// Sort: GET /?sortBy=term:type
router.get('/', bookController.getAllBooks);

// Fetch a book details by ID
router.get('/:id', bookController.bookDetails);

// Add a book (User must be logged in)
router.post('/', auth, bookController.addBook)

// Update a book info (User must be logged in)
router.patch('/:id', auth, bookController.updateBook);

// Delete a book (User must be logged in)
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;