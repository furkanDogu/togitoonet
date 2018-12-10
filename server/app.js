const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const database_config = require('./database_config');



const userRoutes = require('./api/user');
const productRoutes = require('./api/product');
const categoryRoutes = require('./api/category');
const brandRoutes = require('./api/brand');
const supplierRoutes = require('./api/supplier');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//creating database connection
const db = mysql.createConnection(database_config);
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected to the database');
});
global.db = db;



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Accept, Authorization, content-type, web-token,');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();

});


app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/brand', brandRoutes);
app.use('/supplier', supplierRoutes);
//
//

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
});

module.exports = app;