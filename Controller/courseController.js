const bodyParser =require('body-parser')
const express = require('express');
const validator = require('express-validator')
const MongoClient = require('mongodb').MongoClient

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())
app.set('view engine', 'ejs')

var db;
MongoClient.connect('mongodb://klambo94:Password123@ds119380.mlab.com:19380/catalog-db', (err, database) => {
	if(err){
		return console.log(err)
	} else {
		db = database
	}
})

exports.Index = function(req, res) {
	res.sendFile('/home/ubuntu/Documents/Assignment3/index.html')
}

exports.GetCourses = function(req, res) {
	db.collection('courses').find().toArray(function(err, result){
		if(err) return console.log(err)

		res.render('/home/ubuntu/Documents/Assignment3/views/addCourse.ejs', {courses: result})
	});
}

exports.PostCourses = function (req, res) {
	req.checkBody("courseNumber", "Enter a valid course number, must be a number.").isNumeric().notEmpty()
	req.checkBody("courseName", "Name Cannot be empty").notEmpty()
	req.checkBody("courseProfessor", "Professor cannot be empty").notEmpty()
	req.checkBody("courseDate", "Date cannot be empty").notEmpty()
	req.checkBody("courseTime", "Time cannot be empty").notEmpty()

	var errors = req.validationErrors();
	if(errors){
		res.send(errors);
		return;
	} else {
		db.collection('courses').save(req.body, (err, result) => {
			if(err) return console.log(err)

			console.log('Saved to Databse')
			res.redirect('/courses')	
		})
	}
}

exports.Destroy = function(req, res) {
	console.log(req.params)
	var num = req.params.id.toString()
	console.log(num)

	db.collection('courses').remove({"courseNumber" : num}, function(err, result) {
		if(err) {
			return console.log(err)
		}
		res.redirect("/courses")
		console.log('Course Deleted')
	})
}

exports.AddCourse = function(req, res) {
}