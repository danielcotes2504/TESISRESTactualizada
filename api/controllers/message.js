'use strict'

var Message = require('../models/message');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getMessage(req, res) {
    var messageId = req.params.id

    Message.findById(messageId, (err, message) => {
        if (err) {
            res.status(500).send({ message: "Error" });
        } else {
            if (!message) {
                res.status(404).send({ message: "No existen mensajes" });

            } else {
                res.status(200).send({ message });
            }
        }
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getMessages(req, res) {

    Message.find({}, (err, messages) => {
        if (err) {
            res.status(500).send({ message: "Error al buscar" });
        } else {
            if (!messages) {
                res.status(404).send({ message: "No existen mensajes" });
            } else {
                res.status(200).send({ messages });
            }
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function postMessage(req, res) {
    var message = new message();
    var params = req.body;

    message.id = params.id;
    message.topic = params.topic;
    message.user = params.user;
    message.payload = params.payload;
    message.clientID = params.clientID;
    message.qos = params.qos;
    message.publicationDate = params.publicationDate;

    message.save((err, messageStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar' });
        } else {
            res.status(200).send({ user: messageStored });
        }

    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function updateMessage(req, res) {
    var messageId = req.params.id;
    var update = req.body;

    Message.findByIdAndUpdate(messageId, update, (err, messageUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ messageUpdate });
        }
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteMessage(req, res) {
    var messageId = req.params.id;

    Message.findById(messageId, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error" });
        }

        if (!message) {
            res.status(404).send({ message: 'No existen mensajes' });
        } else {
            message.remove((err) => {
                if (err) {
                    res.status(500).send({ message: "Error al borrar" });
                } else {
                    res.status(200).send({ message: "Mensaje eliminado" });
                }
            });
        }
    });
}

module.exports = {
    getMessages,
    getMessage,
    postMessage,
    updateMessage,
    deleteMessage
}