var CourseController = require('./Controller/courseController')
var ScheduleController = require('./Controller/scheduleController')

module.exports = function(app) {
	app.get('/', CourseController.Index);

	app.get("/courses", CourseController.GetCourses);

	app.post('/courses',CourseController.PostCourses);

	app.get('/destroy/:id', CourseController.Destroy);
	app.get('/schedule/:id', ScheduleController.GetSchedule);
}