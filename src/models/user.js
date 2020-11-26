const mongoose = require('mongoose');
const userSchema = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Creating a virtual field to link with Book schema
userSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'owner'
})

// Password hashing
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8); 
    }
    next();
})

// Finding a user by login credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('No user found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Password do not match!');
    }

    return user;
}

// Generate token and save user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.AUTH_KEY);    // Need to hide the key

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

// Getting public profile
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

const User = mongoose.model('User', userSchema);
module.exports = User;