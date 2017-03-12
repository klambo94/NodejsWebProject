var CourseController = require('../Controller/courseController')
var ScheduleController = require('../Controller/scheduleController')
var UserController = require('../Controller/userController')
var bodyParser = require('body-parser')


module.exports = function(app, passport) {
	app.use(bodyParser.urlencoded({extended: true}))
	//User Controllers
	app.get('/', UserController.HomePage);
	app.get('/login', UserController.GetLogin)
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/courses',
		failureRedirect: '/login',
		failureFlash: true
	}))
	app.get('/signup', UserController.GetSignUp)
	app.post('/signup', passport.authenticate('local-signup',{
			
			successRedirect : '/courses', 
			failureRedirect : '/signup', 
			failureFlash : true
	}))

		
		
	app.get('/profile', UserController.Profile)
	app.get('/logout', UserController.Logout)
	
	//Course Controllers
	app.get('/addCatalogCourse', CourseController.Index);
	app.get("/courses", CourseController.GetCourses);
	app.post('/courses',CourseController.PostCourses);
	app.get('/destroy/:id', CourseController.Destroy);

	//Schedule Controllers
	app.get('/addCourse/:id', ScheduleController.GetSchedule);
	app.get('/viewSchedule', ScheduleController.ViewSchedule);
	app.get('/dropCourse/:id', ScheduleController.DropCourse)
}
