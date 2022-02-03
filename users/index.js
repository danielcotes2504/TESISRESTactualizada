'use strict'
const { Router } = require('express')
const router = Router();
var mongoose = require('mongoose');
const { PORT_2 } = require('../server/src/enviroment');
var app = require('./app');

var port = process.env.PORT || PORT_2;

/**
 * Conexión a la base de datos.
 * TODO:Crear colecciones si no existen.
 */
mongoose.connect('mongodb://localhost:27017/uaoiotusers', (err, res) => {

    if (err) {
        throw err;
    } else {
        app.listen(port, function() {
            console.log('Conexión correcta');
        });
    }
})

module.exports = router;