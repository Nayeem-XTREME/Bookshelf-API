const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.signup = async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        user.tokens = user.tokens.concat({token});
        await user.save();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        user.tokens = user.tokens.concat({token});
        await user.save();
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'phone'];
    const isValid = updates.every((x) => {
        return allowedUpdates.includes(x);
    })

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    
    try {
        updates.forEach(x => req.user[x] = req.body[x]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getBooklist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        await user.populate('books').execPopulate()
        res.send(user.books);
    } catch (error) {
        res.status(400).send(error);
    }
}