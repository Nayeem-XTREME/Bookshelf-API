const express = require('express');
const Book = require('../models/book');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Getting all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Fetch a book details
router.get('/book/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Add a book
router.post('/book/add', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    });

    try {
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a book info
router.patch('/book/update', (req, res) => {

})

// Delete a book
router.delete('/book/delete', (req, res) => {
    
})

module.exports = router;