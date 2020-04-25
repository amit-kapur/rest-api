const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (request, response, next) => {
    response.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', checkAuth, (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(201).json({
        message: 'Handling POST request to /orders',
        order: order
    });
});

router.get('/:orderId', checkAuth,  (request, response, next) => {
    const id = request.params.orderId;
    if (id === 'special') {
        response.json({
            message: 'special id requested'
        });
    } else {
        response.json({
            message: 'you passed an ID'
        })
    }
});

router.delete('/:orderId', checkAuth, (request, response, next) => {
    response.status(200).json ({
        message: 'order deleted'
    })
 });

module.exports = router;

