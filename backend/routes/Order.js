var express = require("express");
const { model } = require("mongoose");
const Food = require("../models/Food");
var router = express.Router();

// Load User model
const Order = require("../models/Order");
const Users = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Order.find(function (err, order) {
        if (err) {
            console.log(err);
        } else {
            res.status(400).json(order);
        }
    })
});
router.get("/user/:id", (req, res) => {
    const customer_id = {
        customer_id: req.params.id,
    }
    Order.find(customer_id)
        .then( order => {
           
                res.json(order);
            
        })
        .catch(err =>{
            res.status(404).json("error " + err)
        })
});

router.get("/vendor/:id", (req, res) => {
    const vendor_id = {
        vendor_id: req.params.id,
    }
    Order.find(vendor_id)
        .then(order => res.json(order))
        .catch(err => res.status(404).json("Error: " + err))
});

// food order by customer
router.post("/add", (req, res) => {
    const newOrder = new Order({
        vendor_id: req.body.vendor_id,
        customer_id: req.body.customer_id,
        item_name: req.body.item_name,
        price: req.body.price,
        add_on: req.body.add_on,
        quantity: req.body.quantity,
        //rating: req.body.rating,
        food_id: req.body.food_id,
    });

    const id = req.body.customer_id;

    Users.findById(id)
        .then(user => {
            console.log(newOrder.price);
            console.log(user.wallet);

            let temp = 0;
            for (let i = 0; newOrder.add_on[i] != null; i++) {
                temp = temp + newOrder.add_on[i].price;
            }
            console.log(temp);
            var total_price = newOrder.price + temp;
            total_price=req.body.quantity*total_price;
            if (user.wallet >= total_price) {
                newOrder.save()
                    .then(order => {
                        res.status(200).json(order);
                    })
                    .catch(err => {
                        res.status(404).send(err);
                    });
                const wallet_new = user.wallet - total_price
                user.wallet = wallet_new;
                user.save()
                    .then(food => {
                        console.log("updated wallet");
                        res.json(food);
                    })
                    .catch(err => { console.log(err); })
            }
            else {
                console.log("insufficient amount")
            }
            console.log(user)
        })
});

router.post("/find", (req, res) => {
    const food_id = req.body.food_id;

    Food.findById(food_id)
        .then(user => {
            // Check if user email exists
            console.log(user);
            if (!user) {
                return res.status(404).json(null);
            }
            else {
                res.json(user);
                return user;
            }
        });
})
router.post("/vendor/cancel/:id", (req, res) => {
    //const user_id = req.body.user_id;
    const order_id = req.params.id;
    // console.log(user_id);
    // console.log(order_id);

    Order.findById(order_id)
        .then(order => {
            const user_id = order.customer_id;
            console.log(order);
            if (order.current_status == "Placed") {
                Users.findById(user_id)
                    .then(user => {
                        console.log(req.body.price);
                        console.log(user.wallet);

                        let temp = 0;
                        for (let i = 0; order.add_on[i] != null; i++) {
                            temp = temp + req.body.add_on[i].price;
                        }
                        console.log(temp);
                        var total_price = order.price + temp;
                        total_price=order.quantity*total_price;

                        const wallet_new = user.wallet + total_price;
                        user.wallet = wallet_new;

                        user.save()
                            .then(user => {
                                console.log("updated!");
                                res.json(user);
                            })
                            .catch(err => { console.log(err); })

                        console.log(user)
                        order.current_status = "Cancelled";
                        order.save()
                            .then(food => {
                                console.log("updated!");
                                res.json(order);
                            })
                            .catch(err => { console.log(err); })

                        console.log(order)
                    })
            } else {
                res.json("already cancelled");
            }

        })
})


router.post("/user/cancel/:id", (req, res) => {
    const order_id = req.params.id;
    // console.log(user_id);
    console.log(order_id);

    Order.findById(order_id)
        .then(order => {
            const user_id = order.user_id;
            console.log(order);
            if (order.current_status == "PLACED") {
                Order.findByIdAndDelete(order_id)
                    .then(() => {
                        Users.findById(user_id)
                            .then(user => {
                                console.log(user.wallet);

                                let temp = 0;
                                for (let i = 0; order.addons[i] != null; i++) {
                                    temp = temp + order.addons[i].price;
                                }
                                console.log(temp);
                                const total_price = order.price + temp;

                                const wallet_new = user.wallet + (order.quantity * total_price);
                                user.wallet = wallet_new;

                                user.save()
                                    .then(user => {
                                        console.log("updated!");
                                        res.json(user);
                                    })
                                    .catch(err => { console.log(err); })

                                console.log(user)

                                order.current_status = "CANCELLED";
                                order.save()
                                    .then(food => {
                                        console.log("updated!");
                                        res.json(order);
                                    })
                                    .catch(err => { console.log(err); })

                                console.log(order)
                            })
                    })
            } else if (order.current_status == "CANCELLED") {
                res.json("Already cancelled!");
            }
            else {
                res.json("Order cannot be cancelled at this stage!");
            }
        })
})

router.delete("/delete/:id", (req, res) => {

    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted Order"))
        .catch(err => res.status(400).json("Error: " + err))
})



router.post("/user/update/:id", (req, res) => {
    const order_id = req.params.id
    Order.findById(order_id)
        .then(order => {
            const customer_id = order.customer_id

            if (order.status == "PLACED") {

                Users.findById(customer_id)
                    .then(user => {

                        let temp = 0;
                        for (let i = 0; order.add_on[i] != null; i++) {
                            temp = temp + order.add_on[i].price;
                        }
                        console.log(temp);
                        var total_price = order.price + temp;
                        total_price = total_price * order.quantity;

                        user.wallet = user.wallet + total_price;

                        let temp2 =0;
                        for(let i=0;req.body.add_on[i]!=null;i++){
                            temp2=temp2 + req.body.add_on[i].price;
                        }
                        total_price=req.body.price+temp2;
                        total_price=req.body.quantity+total_price;

                        if(user.wallet >= total_price){
                            user.wallet = user.wallet -total_price
                        
                        user.save()
                                .then(user => {
                                    console.log("updated!");
                                    res.json(user);
                                })
                                .catch(err => { console.log(err); })

                            console.log(user)
                        order.item_name = req.body.item_name;
                        order.quantity = req.body.quantity;
                        order.price = req.body.price;
                        order.add_on = req.body.add_on;
                        order.vendor_id = req.body.vendor_id;
                
                        order.save()
                            .then(food => {
                                console.log("updated!");
                                //res.json(order);
                            })
                            .catch(err => { console.log(err); })

                        console.log(order)}
                        else {
                            res.json("not enough money")
                        }
                    })
            }
            else {
                res.json("Action  not allowed")
            }
        })
})

router.post("/update_vendor/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            order.status = req.body.status,

                order.save()
                    .then(() => res.json("Status updated"))
                    .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/user/pickup/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            order.current_status = req.body.status;
                console.log(order.status);
            order.save()
                .then(() => res.json("Order Completed!"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/user/rate/:id", (req, res) => {

    Order.findById(req.params.id)
        .then(order => {
            if (order.rating == 0){
            order.rating = req.body.rating,
                console.log(order.status);

            Food.findById(order.food_id)
                .then(food => {
                    food.rating = (order.rating * order.quantity + food.rating * food.no_of_users) / (food.no_of_users + order.quantity);
                    food.no_of_users = food.no_of_users + order.quantity;

                    food.save()
                        .then(() => res.json("Rating Updated!"))
                        .catch(err => res.status(400).json("Error: " + err))
                })
            order.save()
                .then(() => res.json("Order Rating Updated!"))
                .catch(err => res.status(400).json("Error: " + err))
            }
            else{
                res.json("Already rated!")
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;
