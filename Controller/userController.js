var path = '/home/ubuntu/Documents/Assignment3/views/'
exports.HomePage = function(req, res) {
	res.render(path + 'index.ejs');
}

exports.GetLogin = function(req, res) {
	res.render(path + 'login.ejs', {message: req.flash('loginMessage')});
}

exports.PostLogin = function(req, res) {

}

exports.GetSignUp = function(req, res) {
	res.render(path + 'signup.ejs', {message: req.flash('signupMessage')})
}



exports.Profile = function(req, res) {
	res.render('profile.ejs', {
		user : req.user // get user out of session and pass to template
	})
}

exports.Logout = function(req, res) {
	req.logout();
	res.redirect('/')
}

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	//if user is authenticated in session, carry on
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/')
	}
}