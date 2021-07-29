'use strict'
const { Router } = require('express')
const router = Router();
var mongoose = require('mongoose');
var app = require('./app-users');
var port = process.env.PORT || 3000;

/**
 * Conexión a la base de datos.
 * TODO:Crear colecciones si no existen.
 */
mongoose.connect('mongodb://localhost:27017/uaoiotmqtt', (err, res) => {

    if (err) {
        throw err;
    } else {
        app.listen(port, function() {
            console.log('Conexión correcta');
        });
    }
})

//module.exports = router;