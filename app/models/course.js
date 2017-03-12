var mongoose = require('mongoose')
var Schema = mongoose.Schema

var course = mongoose.Schema({
	courseNum : String, 
	courseName: String, 
	courseDescription: String, 
	courseProfessor: String, 
	courseDate: String, 
	courseTime: String
})

module.exports = mongoose.model('Courses', course);