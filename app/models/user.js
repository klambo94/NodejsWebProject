var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
	email : {
		type: String, 
		required: true
	},
	password : {
		type: String,
		required: true
	}
})


//Methods 
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

//create this model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);