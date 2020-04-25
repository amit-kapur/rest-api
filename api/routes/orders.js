const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(201).json({
        message: 'Handling POST request to /orders',
        order: order
    });
});

router.get('/:orderId', (request, response, next) => {
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

router.delete('/:orderId', (request, response, next) => {
    response.status(200).json ({
        message: 'order deleted'
    })
 });

module.exports = router;

