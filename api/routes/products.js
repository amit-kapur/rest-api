const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price
    };
    response.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product
    });
});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
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

router.patch('/:productId', (request, response, next) => {
   response.status(200).json ({
       message: 'product updated'
   })
});

router.delete('/:productId', (request, response, next) => {
    response.status(200).json ({
        message: 'product deleted'
    })
 });

module.exports = router;

