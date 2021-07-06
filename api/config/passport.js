//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
//var User = mongoose.model('userlogin');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/userLogin');
const config = require('../config/database');


module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
        if(err){
            return done(err, false);
        }

        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
    }));
}

/*passport.use(new LocalStrategy({
        usernameField: 'user'
    },
    function(username, password, done) {
        User.findOne({ user: username }, function(err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));*/