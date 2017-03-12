console.log("May Node Be With You");

//set up tools
const express = require('express');
const app = express();
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const validator = require('express-validator')
const bodyParser =require('body-parser')
const MongoClient = require('mongodb').MongoClient

const configDB  = require('./config/database.js')

//configuration
mongoose.connect(configDB.url);

require('./config/passport')(passport);

// set up express application
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(validator())
app.set('view engine', 'ejs')


//required for passport
app.use(session({
	secret: 'ilovescotchscotchyscotchscotch',
	resave: true, 
	saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//routes
require('./app/router.js')(app, passport);

//launch 
app.listen(port)
console.log("Listening on port " + port)
