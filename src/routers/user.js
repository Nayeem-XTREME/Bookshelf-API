const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// Getting all users
router.get('/users', (req, res) => {
    
})

// Register a user
router.post('/user/signup', (req, res) => {

})

// Login a user
router.post('/user/login', (req, res) => {

})

// Update a user
router.patch('/user/update', (req, res) => {

})

module.exports = router;