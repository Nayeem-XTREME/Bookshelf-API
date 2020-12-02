const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {

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
}

exports.bookDetails = async (req, res) => {
    try {

        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send({ error: 'No book is found for provided ID' });
        }
        res.status(200).send(book);

    } catch (error) {
        res.status(400).send(error);
    }
}

exports.addBook = async (req, res) => {
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
}

exports.updateBook = async (req, res) => {
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
}

exports.deleteBook = async (req, res) => {
    try {

        const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if (!book) {
            return res.status(404).send({ error: 'No book found' });
        }
        res.status(200).send(book);

    } catch (error) {
        res.status(400).send(error);
    }
}