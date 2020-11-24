const mongoose = require('mongoose');
const bookSchema = require('../schemas/book');

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;