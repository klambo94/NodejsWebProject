var LocalStrategy = require('passport-local').Strategy
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))


var User = require('../app/models/user')

console.log("Passport.js reached")
module.exports = function(passport) {
	
	//Passport session setup
	//required for persistent login sessions

	passport.serializeUser(function(user, done) {
		done(null, user.id)
	})	

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user)
		})
	})

	//Local sign up
	//We are using named strategies since we have one for login and one for sign up
	//by default, if there as no name, it would be called 'local'
	passport.use('local-signup', new LocalStrategy({
		//by defaile, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire reques to the callback
	}, 
	function(req, email, password, done) {
			User.findOne( {'email' : email}, function(err, user) {
				if(err) {
					return done(err, req.flash('signupMessage', 'Error before finding user:' + err))
				}

				if(user) {
					return done(null, false, req.flash('signupMessage', 'User Already exists'))
				} else {
					var newUser = new User();

					newUser.email = email;
					newUser.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err) {
							return done(err, req.flash('signupMessage', 'Error: ' +err))
						}
						return done(null, newUser);
					})
				}
			})
	}))

	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, 
	function(req, email, password, done) {
		User.findOne({'email': email}, function(err, user) {
			if(err)
				return done(err)

			if(!user)
				return done(null, false, req.flash('loginMessage', 'No user found with that email'))
			
			if(!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password'))

			return done(null, user)
		})
	}))
}