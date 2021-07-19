'use strict'

var UserLogin = require('../models/userLogin');
var bcrypt = require("bcryptjs");
require("../request_api_methods/get.js")();
require("../request_api_methods/post.js")();
/*

//GET ALL TOKENS
const getAllTokens = async () => {
    const url = `http://localhost:3000/api/tokenusers`
    const data = await requestData(url)
    const tokens = data;
    // console.log(tokens)
    return tokens;

}*/
let MongoClient = require('mongodb').MongoClient;
let url = `mongodb://localhost:27017/`;
/**
 * Método para crear un usuerio para el login.
 * @param {*} req 
 * @param {*} res 
 */
function postUserLogin(req, res) {

    var userLogin = new UserLogin();
    var params = req.body;

    userLogin.user = params.user;
    userLogin.name = params.name;
    userLogin.password = params.password;
    console.log("POST USERLOGIN PASS: " + userLogin.password);

    //UserLogin.find({user: userLogin.user},(err, userLogin) => {

    //    if(err){
    //        res.status(500).send({ message: "Error al comprobar"});
    //    }else{
    //if(userLogin){
    //  res.status(200).send({ message: "Este usuario ya existe"});
    //}else{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userLogin.password, salt, (err, hash) => {
            //if(err) throw err;

            userLogin.password = hash;

            userLogin.save((err, userLoginStored) => {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar ' + err });
                } else {

                    console.log("POST USERLOGIN: " + hash);
                    res.status(200).send({ userLogin: userLoginStored });
                }
            })


        })

    });




    //}
    //    }
    //});

}

/**
 * Metodo para consultar todos los uusarios de la base de datos.
 * @param {*} req 
 * @param {*} res 
 */

function getUsers(req, res) {

    UserLogin.find({}, (err, users) => {
        if (err) {
            res.status(500).send({ message: 'Error al buscar' });
        } else {
            if (!users) {
                res.status(404).send({ message: 'No existen usuarios' });
            } else {
                res.status(200).send({ users });
                console.log("Se realizó el get")
            }
        }

    });

}


/**
 * Método para obtener el usuari por su nombre.
 * @param {*} req 
 * @param {*} res 
 */
function getUserByName(req, res) {

    var userName = req.params.user;

    UserLogin.findOne({ user: userName }, ['user', 'name', 'password'], (err, user) => {
        if (err) {
            res.status(500).send({ message: "ERROR" });
        } else {
            if (!user) {
                res.status(404).send({ message: 'No existen usuarios' });
            } else {
                res.status(200).send({ message: user });
                console.log(userName);
                console.log(user);
            }
        }
    });


}

function updateUserLogin(req, res) {
    var userId = req.params.id;
    var update = req.body;

    console.log(userId);

    UserLogin.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar' });
        } else {
            res.status(200).send({ userUpdate });
        }
    });
}

function deleteUserLogin(req, res) {
    var user = req.params.user;

    UserLogin.findOneAndRemove({ user: user }, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Error " + err });
        } else if (!user) {
            res.status(404).send({ message: "No existen usuarios" });
        } else if (!err) {
            console.log("Se realizó el Delete vironcha")

            res.status(200).send({ message: "Usuario eliminado" });
        }
    });
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const query = { user: user }
        let dbo = db.db("server");
        let dbo2 = db.db("uaoiotmqtt");
        dbo2.collection("tokens").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All tokens deleted");


        });
        dbo.collection("values").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All values deleted");

        });
        dbo.collection("variables").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All variables deleted");


        });
        dbo.collection("devices").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All devices deleted");


        });
        dbo.collection("projects").deleteMany(query, function(err, res) {
            if (err) throw err;
            console.log("All projects deleted");

            db.close();
        });
    });

}

module.exports = {

    getUsers,
    getUserByName,
    postUserLogin,
    deleteUserLogin,
    updateUserLogin

}