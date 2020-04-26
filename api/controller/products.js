const mongoose = require('mongoose');
const Product = require('../models/product');

exports.get_all_products = (request, response, next) => {
    Product.find()
        .select('name price _id')
        .exec()
        .then(result => {
            const res = {
                count: result.length,
                products: result.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/products/' + doc._id
                        }
                    }
                })
            }
            console.log('From mongo database: ' + res);
            response.status(200).json(res);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
}

exports.create_product = (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price
    });
    product.save().then(result => {
        console.log(result);
        if (result) {
            response.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products/' + result._id
                    }
                }
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
}

exports.get_product = (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id)
        .select('name price _id')
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json({
                product: result,
                request: {
                    type: 'GET',
                    description: 'get all products',
                    url: 'http://localhost:5000/products/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
}

exports.update_product = (request, response, next) => {
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
            response.status(200).json({
                message: 'Product updated',
                request: {
                    type: 'GET',
                    description: 'get all products',
                    url: 'http://localhost:5000/products/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
}

exports.delete_product = (request, response, next) => {
    const productId = request.params.productId;
    Product.remove({ _id: productId })
        .exec()
        .then(result => {
            console.log('From mongo database: ' + result);
            response.status(200).json({
                message: 'Product deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:5000/products/',
                    body: { name: 'String', price: 'Number' }
                }
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                error: err
            });
        });
}


