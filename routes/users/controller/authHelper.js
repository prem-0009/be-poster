const User = require('../model/User');
const Favorites = require('../../favorites/favModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function createUser(user) {
    let newUser = await new User({
        username: user.username, 
        email: user.email, 
        // gender: user.gender, 
        password: user.password, 
    });
    return newUser;
}

async function hashPassword(password) {
    let genSalt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, genSalt);
    return hashedPassword;
}

async function errorHandler(error) {
    let errorMessage = null; 
    if (error.errmsg.includes('email_1')) {
        errorMessage = 'Email Already Exist! Please Choose Another One';
    } else if (error.errmsg.includes('username_1')) {
        errorMessage = 'Username Already Exist! Please Choose Another One';
    }
    return {
        status: 409,
        message: errorMessage
    };
}

async function findOneUser(email) {
    try {
        let foundUser = await User.findOne({email});
        if (!foundUser) {
            return 404;
        }
        return foundUser;
    } catch (error) {
        return error;
    }
}

//find user with username from favorites list
async function findUserWithUserName(username) {
    try {
        let foundUser = await Favorites.findOne({username});
        
        // if (!foundUser) {
        //     return 404;
        // }
        return foundUser;
    } catch (error) {
        return error;
    }
}


async function comparePassword(incomingPassword, userPassword) {
    try {

        let comparedPassword = await bcrypt.compare(incomingPassword, userPassword);
        if (comparedPassword) {
            return comparedPassword;
        } else {
            return 409;
        }

    } catch (error) {
        return error;
    }
}

async function createJwtToken(user) {
    let payload = {
        id: user._id, 
        email: user.email, 
        username: user.username
    }
    let jwtToken = await jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 3600});
    return jwtToken;
}

module.exports = {
    hashPassword,
    errorHandler,
    createUser,
    findOneUser,
    comparePassword,
    createJwtToken,
    findUserWithUserName
}