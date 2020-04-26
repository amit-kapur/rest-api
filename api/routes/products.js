const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ProductController = require('../controller/products');

router.get('/', ProductController.get_all_products);

router.post('/', checkAuth , ProductController.create_product);

router.get('/:productId', ProductController.get_product);

router.patch('/:productId', checkAuth, ProductController.update_product);

router.delete('/:productId', checkAuth, ProductController.delete_product);

module.exports = router;

