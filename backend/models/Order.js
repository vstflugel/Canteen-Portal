const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer_id: {
        type: String
    },

    item_name: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    add_on: {
        type: [{ food_add_on: String, price: Number }],

    },
    vendor_id: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    rating: {
        type: Number,
        //required: true,
        default: 0,
        min: 0,
        max: 5
    },
    current_status: {
        type: String,
        default:"Placed"
    },},
    {
    timestamps:true  
    }

    // 
);

module.exports = Orders = mongoose.model("Orders", OrderSchema);