'use strict'

var express = require('express');
var app = express();
var path = require("path");
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');


require('./config/passport');

//Routes
var apiUser = require('./routes/user');
var apiUserLogin = require('./routes/userLogin');
var apiToken = require('./routes/token');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Alllow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});


app.use('/api', apiUser);
app.use('/api', apiUserLogin);
app.use('/api', apiToken);




module.exports = app;