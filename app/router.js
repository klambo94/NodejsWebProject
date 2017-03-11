var CourseController = require('../Controller/courseController')
var ScheduleController = require('../Controller/scheduleController')
var UserController = require('../Controller/userController')
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

module.exports = function(app, passport) {
	
	//User Controllers

	app.get('/', UserController.HomePage);
	app.get('/login', UserController.GetLogin)
	app.post('/login', UserController.PostLogin)
	app.get('/signup', UserController.GetSignUp)
	app.post('/signup', passport.authenticate('local-signup',  {
		successRedirect : '/profile', 
		failureRedirect : '/signup', 
		falureFlash : true
	}))

		
		
	app.get('/profile', UserController.Profile)
	app.get('/logout', UserController.Logout)
	
	//Course Controllers
	app.get('/addCatalogCourse', CourseController.Index);
	app.get("/courses", CourseController.GetCourses);
	app.post('/courses',CourseController.PostCourses);
	app.get('/destroy/:id', CourseController.Destroy);

	//Schedule Controllers
	app.get('/schedule/:id', ScheduleController.GetSchedule);
}
