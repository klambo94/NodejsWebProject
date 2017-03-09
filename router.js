var HomeController = require('./Controller/HomeController')

module.exports = function(app) {
	app.get('/', HomeController.Index);

	app.get("/courses", HomeController.GetCourses);

	app.post('/courses',HomeController.PostCourses);

	app.get('/destroy/:id', HomeController.Destroy);
}