const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users');

const bcrypt = require('bcrypt');

router.post('/signup', (request, response, next) => {

    const user = User.find({ email: request.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return response.status(409).json({
                    message: 'email already exists'
                })
            } else {
                bcrypt.hash(request.body.email, 10, (err, hash) => {
                    if (err) {
                        response.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: request.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log('user created' + result);
                                response.status(201).json({
                                    message: 'user created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                response.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        });
});

router.delete('/:userId', (request, response, next) => {
    const userId = request.params.userId;
    Product.remove({ _id: userId })
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

module.exports = router;

