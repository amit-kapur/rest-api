const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// connect to DB
mongoose.connect("mongodb://localhost/ak-shop", {
    useNewUrlParser: true
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (request.method === 'OPTIONS') { // Options request send for every POST or PUT request.
        response.header('Access-Control-Allow-MEthods', 'PUT, POST, PATCH, GET, DELETE');
        response.status(200).json({}); // return 200 with empty payload. 
    }
    next();
})

// Routing
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error Handling
app.use('/', (request, response, next) => {
    const error = new Error({
        message: 'not found'
    });
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    
    response.status (error.status || 500);
    
    response.json({
        error: {
            message: 'not found'
        }
    });
});


module.exports = app;
