'use strict'

var Token = require('../models/token');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function postToken(req, res) {
    var token = new Token();
    var params = req.body;

    token.value = params.value;
    token.user = params.user;

    token.save((err, tokenStored) => {
        if (err) {
            res.status(500).send({ message: 'Error ' + err });
        } else {
            res.status(200).send({ token: tokenStored });
        }
    });
}

/**
 *
 * @param {*} req 
 * @param {*} res 
 */
function getTokenUser(req, res) {

    var tokenUser = req.params.user;

    console.log(Token)

    Token.find({ user: tokenUser }, ['value', 'user'], (err, token) => {
        if (err) {
            res.status(500).send({ message: "Error " + err });
        } else {
            if (!token) {
                res.status(404).send({ message: "Este usuario no existe" });
            } else if (token.length == 0) {
                res.status(400).send({ message: "Este usuario no tiene token" });
            } else {
                res.status(200).send({ token });
            }
        }
    })
}

function getTokenAllUsers(req, res) {


    Token.find({}, ['value', 'user'], (err, token) => {
        if (err) {
            res.status(500).send({ message: "Error " + err });
        } else {
            if (!token) {
                res.status(404).send({ message: "Este usuario no existe" });
            } else if (token.length == 0) {
                res.status(400).send({ message: "Este usuario no tiene token" });
            } else {
                res.status(200).send({ token });
            }
        }
    })


}

module.exports = {
    getTokenUser,
    getTokenAllUsers,
    postToken
}

