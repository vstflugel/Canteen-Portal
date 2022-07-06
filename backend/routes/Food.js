var express = require("express");
var router = express.Router();

// Load User model
const Food = require("../models/Food");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    Food.find(function(err, foods) {
		if (err) {
			console.log(err);
		} else {
			res.json(foods);
		}
	})
});

router.post("/add", (req, res) => {
    const newFood = new Food({
        vendor_id: req.body.vendor_id,
        //email: req.body.email,
        item_name: req.body.item_name,
        price: req.body.price,
        veg: req.body.veg,
        add_on: req.body.add_on,
        rating: req.body.rating,
        tags: req.body.tags,
        no_of_users: req.body.no_of_users,
    });

    newFood.save()
        .then(food => {
            res.status(200).json(food);
        })
        .catch(err => {
            res.status(404).send(err);
        });
});

router.post("/find", (req, res) => {
    const food_id =  req.body.food_id;

    Food.findById( food_id )
    .then(user => {
        // Check if user email exists
        console.log(user);
        if (!user) {
            return res.status(400).json(null);
        }
        else {
            res.json(user);
            return user;
        }
    });  
})

router.post("/update/:id", (req,res) => {
    Food.findById(req.params.id) 
        .then(food => {
            //food.shop_name=req.body.shop_name;
            food.item_name = req.body.item_name;
            food.price = req.body.price;
            food.veg = req.body.veg;
            food.add_on = req.body.add_on;
            food.tags = req.body.tags;
            food.rating = req.body.rating;
            food.no_of_users = req.body.no_of_users;
            
            food.save()
                .then(food => {
                    res.json(food);
                    console.log("updated!");
                })
                .catch(err => res.status(404).json("Error: " + err))
        })
        .catch(err => res.status(404).json("Error: " + err))
})

router.delete("/delete/:id",(req,res)=>{
    Food.findByIdAndDelete(req.params.id)
    .then(food => {
        res.json(food);
        console.log("deleted");
    })
    .catch(err=>res.status(404).json("Error: "+ err))

})

router.post("/find/:id", (req, res) => {
    const food_id = req.params.id;
    
    Food.findById( food_id )
    .then(user => {
        // Check if user email exists
        console.log(user);
        if (!user) {
            return res.status(400).json(null);
        }
        else {
            res.json(user);
            return user;
        }
    });  
})
module.exports = router;