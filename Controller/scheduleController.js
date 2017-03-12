
var mongoose = require('mongoose')
var Schema = mongoose.schema

var Schedule = require('../app/models/schedule')
var User = require('../app/models/schedule')
var Course = require('../app/models/course').Schema;
var CourseModel = mongoose.model('Courses', Course)
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://klambo94:Password123@ds119380.mlab.com:19380/catalog-db', (err, database) => {
	if(err){
		return console.log(err)
	} else {
		db = database
	}
})

const express = require('express');
const passport = require('passport')
const app = express();

app.use(passport.session())

exports.GetSchedule = function(req, res) {
	var courseNum = req.params.id.toString();
	var currentEmail = req.user.email;

	var schedule =  new Schedule({
			email : currentEmail, 
			lineItem : courseNum
	})

	schedule.save(function(err) {
		if(err) return handleError(err)

	})

	res.redirect('/ViewSchedule')
}

exports.ViewSchedule = function(req, res) {
	var currentEmail = req.user.email;
	db.collection('courses').find().toArray(function(err, courseResult){
		if(err) return console.log(err)

			db.collection('schedules').find().toArray(function(err, scheResult){
				if(err) return console.log(err)
					res.render('/home/ubuntu/Documents/Assignment3/views/schedule.ejs', {courses: courseResult, 
																						 email: currentEmail,
																						 schedule: scheResult})
			})
		
	});
}

exports.DropCourse = function(req, res) {
	var num = req.params.id.toString()
	var email = req.user.email
	console.log(num)

	db.collection('schedules').remove({'email': email, 'lineItem' : num}, function(err, result) {
		if(err) {
			return console.log(err)
		}
		res.redirect("/ViewSchedule")
		console.log('Course Dropped')
	})
}

