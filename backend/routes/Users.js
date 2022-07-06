var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact_no: req.body.contact_no,
        age: req.body.age,
        batch: req.body.batch,
        date: req.body.date,
        occupation: req.body.occupation
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {

	const email = req.body.email;
    const password= req.body.password;
	// Find user by email
	User.findOne({ email })
        .then(user => {
		// Check if user email exists
		if (user == null) {
			return res.status(404).json(null)
        }
        else{
            
            if(user.password == password)
            {
                res.json(user)
                return user;
            }
            else {
                res.json(null)
            }
            
        }
	});
});


router.post("/profile", (req,res) => {

    const email = req.body.email;

    User.findOne({ email })
        .then(user => {
            if (user != null) {
                return res.json(user)
            }
            else{
                    res.json(null)
                }
                
            }
	    )
        .catch(err => {console.log(err);})
});


router.post("/update/:id", (req,res) => {

    User.findById(req.params.id) 
        .then(user => {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.contact_no = req.body.contact_no;
            user.age = req.body.age;
            user.batch = req.body.batch;
            user.occupation = req.body.occupation;
            user.wallet = req.body.wallet;
            
            user.save()
                .then(user => {
                    res.json(user);
                    console.log("updated!");
                })
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})
module.exports = router;

