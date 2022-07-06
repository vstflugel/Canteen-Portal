const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email")

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contact_no: {
		type: String,
		length: 10
	},
	age: {
		type: String
	},
	batch: {
		type: String
	},
	occupation: {
		type: String
	},
	date:{
		type: Date,
		required: false
	},
	wallet:{
		type: Number,
		default: 0
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
