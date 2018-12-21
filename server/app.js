const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const database_config = require('./database_config');


// importing routes from api folder.
// each will be used with their names like 
// /user => userRoutes 
// /product => productRoutes etc.
const userRoutes = require('./api/user');
const productRoutes = require('./api/product');
const categoryRoutes = require('./api/category');
const brandRoutes = require('./api/brand');
const supplierRoutes = require('./api/supplier');

// morgan is a tool that showns coming requests in command prompt. Very helpful for debugging
// bodyParser is encoding coming json data to js object.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//creating database connection and attaching it to the global variable.
const db = mysql.createConnection(database_config);
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected to the database');
});
global.db = db;


// here we allow anything possible to avoid CORS errors.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Authorization, content-type, web-token,');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();

});

// attaching routes to the application
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/brand', brandRoutes);
app.use('/supplier', supplierRoutes);

// if all the routes are checked and there is no matched route, then given endpoint is not valid so we need to show 404 not found here.
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// this one is responsible for showing error messages of previos layer.
app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});

module.exports = app;