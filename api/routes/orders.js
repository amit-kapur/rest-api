const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controller/orders');

// Handle incoming GET request to /orders route
router.get('/', checkAuth, ordersController.get_all_orders);

// create a new order
router.post('/', checkAuth, ordersController.create_orders);

// get single order 
router.get('/:orderId', checkAuth, ordersController.get_orderById);

// delete a order
router.delete('/:orderId', checkAuth, ordersController.delete_order);

module.exports = router;

