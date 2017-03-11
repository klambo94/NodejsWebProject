var LocalStrat = require('passport-local').Strategy
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))


var User = require('../app/models/user')

console.log("Passport.js reached")
module.exports = function(passport) {
	console.log("Reached Passport exports")

	//Passport session setup
	//required for persistent login sessions

	passport.serializeUser(function(user, done) {
		done(null, user.id)
	})	

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, done) {
			done(err, user)
		})
	})

	//Local sign up
	//We are using named strategies since we have one for login and one for sign up
	//by default, if there as no name, it would be called 'local'
	passport.use('local-signup', new LocalStrat({
		//by defaile, local strategy uses username and password, we will override with email
		usernameFeild : 'email',
		passwordFeild : 'password',
		passReqToCallback : true // allows us to pass back the entire reques to the callback
	}, 
	function(req, email, password, done) {
		findOrCreateUser = function() {
			User.findOne( {'local.email' : email}, function(err, user) {
				if(err) {
					console.log("Error in Signup:" + err)
					return done(err)
				}

				if(user) {
					console.log('User already exists')
					return done(null, false, req.flash('signupMessage', 'User Already exists'))
				} else {
					var newUser = new User();

					newUser.email = email;
					newUser.password = newUser.generateHash(password);

					newUser.save(function(err){
						if(err) {
							console.log('Error in saving user' + err);
							throw err;
						}
						console.log('User Signup succesful')
						return done(null, newUser);
					})
				}
			})
		}
	}))
}