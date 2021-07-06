'use strict'

var User = require('../models/user');
var Token = require('../models/token');
var bcrypt = require("bcryptjs");
var crypto = require("crypto");

/**
 * Metodo para consultar un usuario de la base de datos mediante su id.
 * @param {*} req 
 * @param {*} res 
 */
function getUser(req, res) {
    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error" });
        } else {
            if (!user) {
                res.status(404).send({ message: 'No existen usuarios' });
            } else {
                res.status(200).send({ user });
            }
        }

    })

}
/**
 * Metodo para consultar todos los uusarios de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
function getUsers(req, res) {

    User.find({}, (err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar' });
        } else {
            if (!users) {
                res.status(404).send({ message: 'No existen usuarios' });
            } else {
                res.status(200).send({ users });
            }
        }

    });

}

/**
 * Función POST para guardar usuarios en la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
function postUser(req, res) {
    var user = new User();
    var token = new Token();
    var params = req.body;
    user.login = params.login;
    user.password = params.password;
   // User.find({ login: user.login},(err,user) => {
   //     if(err){
   //         res.status(500).send({ message: "Error al comprobar"});
   //     }else{
            //if(user){
            //    res.status(200).send({ message: 'Este usuario ya existe'});
            //}else{

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            //if(err) throw err;

            user.password = hash;

            console.log("HASH USERLOGIN: " + hash);

            let hash256 = crypto.createHash('sha256').update(new Buffer(user.password,'utf8')).digest('hex');
            console.log("HASH256 USER: " + hash256);

            token.value = hash;
            token.user = user.login;
            
            user.password = hash256;
            
            user.save((err, userStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar ' + err});

                } else {

                    token.save((err, tokenStored) =>{
                        if(err){
                            res.status(500).send({message: 'Error ' + err});
                        }else{
                            res.status(200).send({user: userStored, token: tokenStored});
                        }

                    });
                    
                }
        
            });
        });
    });
            //}
        //}
    //});
    //console.log("HASH USERLOGIN PASS: " + user.password);
}

/**
 * Metodo para actualizar un usuario de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ userUpdate });
        }
    });
}

/**
 * Metodo para eliminar un usuario de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */
function deleteUser(req, res) {
    var user = req.params.login;

    User.findOneAndRemove({login: user}, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error " + err });
        }else if (!user) {
            res.status(404).send({ message: 'No existen usuarios' });
        }else if(!err) {
            res.status(200).send({ message: "Usuario eliminado" });
            /*User.remove((err) => {
                if (err) {
                    res.status(500).send({ message: "Error al borrar" });
                } else {
                    res.status(200).send({ message: "Usuario eliminado" });
                }
            });*/
        }
    });
}

module.exports = {
    getUser,
    getUsers,
    postUser,
    updateUser,
    deleteUser
}