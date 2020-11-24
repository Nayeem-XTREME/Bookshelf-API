const express = require('express');
const User = require('../models/user');
const router = new express.Router();

// Getting all users
router.get('/users', (req, res) => {
    
})

// Register a user
router.post('/user/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Login a user
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a user
router.patch('/user/update', (req, res) => {

})

module.exports = router;