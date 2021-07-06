var passport = require('passport');
var mongoose = require('mongoose');
//var User = mongoose.model('UserLogin');
var User = require('../models/userLogin');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

function register(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new UserLogin();

    user.name = req.body.name;
    user.user = req.body.user;

    user.setPassword(req.body.password);

    user.save(function(err) {

        if (err) {
            res.status(500).send({ message: 'Error al guardar' });
        } else {
            //res.status(200).send({ user: userStored });
            var token;
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        }

        
    });

};

function login(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};

module.exports = {
    register,
    login
}