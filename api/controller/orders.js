const Order = require('../models/order');

exports.get_all_orders = (request, response, next) => {
    response.status(200).json({
        message: 'Orders were fetched'
    });
}

exports.create_orders = (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity
    };
    response.status(201).json({
        message: 'Handling POST request to /orders',
        order: order
    });
}

exports.get_orderById = (request, response, next) => {
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
}

exports.delete_order = (request, response, next) => {
    response.status(200).json ({
        message: 'order deleted'
    })
 }
