console.log("May Node Be With You");

const express = require('express');
const bodyParser =require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var db
MongoClient.connect('mongodb://klambo94:Password123@ds119380.mlab.com:19380/catalog-db', (err, database) => {
	if(err){
		return console.log(err)
	} else {
		db = database
		app.listen(3000, function() {
			console.log('Listening on 3000');
		})
	}
		
})


//handlers

app.get('/', function(req, res) {
	res.sendFile('/home/ubuntu/Documents/Assignment3/index.html')
})

app.get("/courses", function(req, res) {
	db.collection('courses').find().toArray(function(err, result){
		if(err) return console.log(err)

		res.render('index.ejs', {courses: result})
	});
})

app.post('/courses', (req, res) => {
	db.collection('courses').save(req.body, (err, result) => {
		if(err) return console.log(err)

		console.log('Saved to Databse')
		res.redirect('/courses')	
	})
})