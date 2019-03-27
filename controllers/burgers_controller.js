//Dependecies

var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res){
	burger.selectAll(function(data){
		var hbsObject = {
			burgers: data
		};
		console.log(hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/", function(req, res) {
    //console.log(req.body.devoured); - undefined
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, false
    ], function() {
      // Send back the ID of the new quote
      res.redirect("/");
    });
  });

router.put("/:id", function(req, res) {
    //console.log(req);
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function() {
      res.redirect("/");
    });
});






module.exports = router;
