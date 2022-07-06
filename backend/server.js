const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var VendorRouter = require("./routes/Vendors");
var FoodRouter = require("./routes/Food");
var OrderRouter = require("./routes/Order");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb+srv://civicsympathy2912:Rishabh29@@cluster0.rmzil.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/vendor", VendorRouter);
app.use("/food",FoodRouter);
app.use("/order",OrderRouter);
//app.use("/profile", ProfileRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
