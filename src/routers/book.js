const express = require('express');
const Book = require('../models/book');
const router = new express.Router();

// Getting all books
router.get('/books', (req, res) => {
    
})

// Fetch a book details
router.get('/book/:id', (req, res) => {

})

// Add a book
router.post('/book/add', (req, res) => {

})

// Update a book info
router.patch('/book/update', (req, res) => {

})

// Delete a book
router.delete('/book/delete', (req, res) => {
    
})

module.exports = router;