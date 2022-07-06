const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    email: {
        type:String
    },
    vendor_id: {
        type:String
    },
    food_id: {
        type:String
    },
    item_name: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    rating: {
        type: Number,
        //required: true,
        default: 0,
        min: 0,
        max: 5
    },
    veg: {
        type: String
        //type: Boolean,
        //required: true,
    },
    add_on: {
        type: [{food_add_on: String , price: Number}],
        
    },
    tags: {
        type: [String],
    },
    no_of_users: {
        type: Number,
        default: 0
    }
},
// 
);

module.exports = Foods = mongoose.model("Foods", FoodSchema);