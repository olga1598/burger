//Dependecies

var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

router.post("/api/burgers", function (req, res) {
  console.log(req.body.burger_name, req.body.devoured);
  let cb = function() {
      res.redirect("/");
  }
  burger.create("burger_name","devoured",req.body.burger_name,cb);
});

router.put("/api/burgers/:id", function (req, res) {
  // console.log(req);
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update("devoured", true, req.body.id, function (result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

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

module.exports = router;
