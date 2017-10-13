var express = require("express");

var router = express.Router();
var methodOverride = require("method-override");

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.redirect('/burger')
});

router.get("/burger", function(req, res){
   burger.selectAll(function(data) {
    var hbsObject = {
      burger: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
})

router.post("burger/create", function(req, res) {

  burger.insertOne([
    "burger_name", "date"
  ], [
    req.params.name, req.params.time
  ], function() {
    // Send back the ID of the new quote
    res.redirect("/burger");
  });
});

router.put("burger/:id", function(req, res) {

  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/burger");
  });
});

// Export routes for server.js to use.
module.exports = router;
