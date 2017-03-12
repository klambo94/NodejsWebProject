var mongoose = require('mongoose')
var Schema = mongoose.Schema

var scheduleSchema = mongoose.Schema({
	scheduleId : String, 
	email : String,
	lineItem: String
})

module.exports = mongoose.model('Schedule', scheduleSchema);