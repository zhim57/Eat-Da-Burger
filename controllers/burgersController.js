var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger");
var ingredient = require("../models/ingredient");
// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.read(function (data) {    // .then( data => 

    var hbsObject0 = {
      burgers: data
    };
    ingredient.read(function (data1) {
      
      var data2={};

      for ( var i=0 ; i<data1.length;i++){

        data2[i] = {
          id: data1[i].id,
          name: data1[i].name,
          price: "$"+(data1[i].price).toFixed(2),
          vegetarian: data1[i].vegetarian,
          selected: data1[i].selected,
          checked: data1[i].checked
      }


      }
     
      var hbsObject1 = {
        ingredients: data2
      };
      var hbsObject = { ...hbsObject0, ...hbsObject1 };
      res.render("index", hbsObject);
    });
  });
});

router.get("/api/ingredients/get/", function (req, res) {
  ingredient.read(function (data) {
    var hbsObject3 = {
      ingredients: data
    };
    res.json(hbsObject3);
  });
});

router.post("/api/burgers", function (req, res) {
  var cols = Object.entries(req.body).map(e => e[0]);
  var vals = Object.entries(req.body).map(e => e[1]);


  burger.create(cols, vals)
    .then(results => {
      res.json({ id: results.insertId });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.update({
    devoured: req.body.devoured
  }, condition)
    .then(result => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.delete(condition)
    .then(result => {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//===================== ingredients
router.delete("/api/ingredient/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  ingredient.delete(condition)
    .then(result => {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/api/ingredient/create", function (req, res) {
  var cols = Object.entries(req.body).map(e => e[0]);
  var vals = Object.entries(req.body).map(e => e[1]);
  console.log(cols, vals);
  ingredient.create(cols, vals)
    .then(results => {
      res.json({ id: results.insertId });
    })
    .catch(err => {
      console.log(err);
    });
});


router.put("/api/ingredients/select/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  // var cols = Object.entries(req.body).map(e => e[0]);
  // var vals = Object.entries(req.body).map(e => e[1]);

  ingredient.update({
    selected: req.body.selected,
    checked: req.body.checked
  }, condition)
    .then(result => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
});
router.delete("/api/ingredients/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  ingredient.delete(condition)
    .then(result => {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    })
    .catch(err => {
      console.log(err);
    });
});

// Export routes for server.js to use.
module.exports = router;
