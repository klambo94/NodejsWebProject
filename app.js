console.log("May Node Be With You");

const express = require('express');
const validator = require('express-validator')
const bodyParser =require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())
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



require('./router')(app);
