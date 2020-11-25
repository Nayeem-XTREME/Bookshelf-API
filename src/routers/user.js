const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const router = new express.Router();

// Getting all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
})

// Register a user
router.post('/user/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})

// Login a user
router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})

// Update a user
router.patch('/user/update', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        res.status(400).send({ error: 'Invalid updates' });
    } else {
        try {
            updates.forEach(x => req.user[x] = req.body[x]);
            await req.user.save();
            res.send(req.user);
        } catch (error) {
            res.status(400).send(error);
        }
    }
})

// Getting book list of an user
router.get('/user/books', auth, async (req, res) => {
    try {
        
        const user = await User.findById(req.user._id);
        await user.populate('books').execPopulate()
        res.send(user.books);

    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;