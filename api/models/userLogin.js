'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");



var userLoginSchema = new mongoose.Schema({
    user: String,
    name: String,
    password:String 
});

var UserLogin = module.exports = mongoose.model('userlogin', userLoginSchema);

module.exports.getUsers = function(user,callback){
    UserLogin.find({},callback);
}

module.exports.getUserById = function(id, callback){
    UserLogin.findById(id, callback);
}

module.exports.getUserByUsername = function(user, callback){
    const query = {user: user}
    UserLogin.findOne(query, callback);
}

module.exports.addUser = function(newUser,callback){

    /*let hash = crypto.createHash('sha256').update(new Buffer(newUser.password,'utf8')).digest('hex');
    newUser.password = hash;
            newUser.save(callback);*/

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    

    bcrypt.compare(candidatePassword , hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
/*userLoginSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userLoginSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userLoginSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        user: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};*/

