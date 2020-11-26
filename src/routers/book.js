const express = require('express');
const Book = require('../models/book');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Getting all books
// Sort: GET books/?sortBy=term:type
router.get('/books', async (req, res) => {

    const sortVal = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');

        const term = parts[0];
        const type = parts[1] === 'desc' ? -1 : 1;
        const keys = ['name', 'author', 'publication', 'createdAt', 'updatedAt'];
        
        if (!keys.includes(term)) {
            return res.status(400).send({ error: 'Invalid query parameters' });
        }

        sortVal[term] = type;
    }

    try {
        const books = await Book.find({}).sort(sortVal);
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Fetch a book details by ID
router.get('/book/:id', async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ error: 'No book is found for provided ID' });
        }
        res.status(200).send(book);

    } catch (error) {
        res.status(400).send(error);
    }
})

// Add a book (User must be logged in)
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

// Update a book info (User must be logged in)
router.patch('/book/update/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'author', 'publication'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    } 

    try {

        const book = await Book.findOne({ _id: req.params.id, owner: req.user._id });
        if (!book) {
            return res.status(404).send({ error: 'No book found' });
        }
        updates.forEach(x => book[x] = req.body[x]);
        await book.save();
        res.send(book);

    } catch (error) {
        res.status(400).send(error);  
    }
})

// Delete a book (User must be logged in)
router.delete('/book/delete/:id', auth, async (req, res) => {
    try {

        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!book) {
            return res.status(404).send({ error: 'No book found' });
        }
        res.status(200).send(book);

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;