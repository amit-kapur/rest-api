const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (request, response, next) => {
    Product.find()
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save().then(result => {
        console.log(result);
        if (result) {
            response.status(201).json({
                message: 'Handling POST request to /products',
                createdProduct: product
            });
        } else {
            response.status(404).json({
                message: 'product not found.'
            });
        }

    })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

router.patch('/:productId', (request, response, next) => {
    const productId = request.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: productId }, {
        $set: {
            updateOps
        }
    })
    .exec()
    .then(result => {
        console.log('From mongo database: ' + result);
        response.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        response.status(500).json({
            error: err
        });
    });
});

router.delete('/:productId', (request, response, next) => {
    const productId = request.params.productId;
    Product.remove({ _id: productId })
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
});

module.exports = router;

