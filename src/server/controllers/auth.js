const jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    User = require('../models/user.model.js'),
    config = require('../config/config.js');

function generateToken(user) {
    return jwt.sign(user, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// Set user info from request
function setUserInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
    }
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {

    let userInfo = setUserInfo(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        user: userInfo
    });
};


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
    // Check for registration errors
    const username = req.body.username;
    const password = req.body.password;

    // Return error if full name not provided
    if (!username) {
        return res.status(422).send({ error: 'Пожалуйста, введите имя пользователя.'});
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'Пожалуйста, введите пароль.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'Это имя пользователя уже используется.' });
        }

        // If email is unique and password was provided, create account
        let user = new User({
            username: username,
            password: password
        });

        user.save(function(err, user) {
            if (err) { return next(err); }

            // Respond with JWT if user was created

            let userInfo = setUserInfo(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            });
        });
    });
};