const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email")

// Create Schema
const VendorSchema = new Schema({
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
	occupation: {
		type: String
	},
    manager: {
		type: String
	},
    opening_time: {
		type: String
	},
    closing_time: {
		type: String
	},
	date:{
		type: Date,
		required: false
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
