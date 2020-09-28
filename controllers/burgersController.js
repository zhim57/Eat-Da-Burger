var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger");
var ingredient = require("../models/ingredient");

// Create all our routes and set up logic within those routes where required.



router.get("/", function (req, res) {
  burger.read(function (data){    // .then( data => 
  
    var hbsObject0 = {
      burgers: data
    };
    ingredient.read(function (data1){                  // then( data1 =>  {
      // for (let i=0; i<data1.length; i++){
      
        
          var hbsObject1 = {
            ingredients: data1
          };
    // };

    var hbsObject={...hbsObject0, ...hbsObject1};
    // console.log(hbsObject);
    res.render("index", hbsObject);
    console.log(hbsObject);
    });

    // console.log(hbsObject);
    //  res.render("index", hbsObject2);
  });


  // .catch( err => {
  //   console.log(err);
  // });


});
// function getIngredients() {
//   router.get("/ingredients", function (req, res) {
//   ingredient.read(function (data)    // .then( data => 
//   {
//     var hbsObject2 = {
//       ingredients: data
//     };
//     // console.log(hbsObject);
//    res.render("index", hbsObject2);
//   });
// });
// };

router.post("/api/burgers", function (req, res) {
  var cols = Object.entries(req.body).map(e => e[0]);
  var vals = Object.entries(req.body).map(e => e[1]);
  console.log(req.body);
  console.log(cols);
  console.log(vals);

  burger.create(cols, vals)
    .then(results => {
      // console.log(results);
      res.json({ id: results.insertId });
    })
    .catch(err => {
      console.log(err);
    });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

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


// router.get("/ingredients", function (req, res) {
//   ingredient.read(function (data)    // .then( data => 
//   {
//     let hbsObject1 = {
//       ingredients: data
//     };
//     // console.log(hbsObject1);
//     res.render("index", hbsObject1);
//   });
//   // .catch( err => {
//   //   console.log(err);
//   // });
// });

router.post("/api/test2", function (req, res) {
  var cols = Object.entries(req.body).map(e => e[0]);
  var vals = Object.entries(req.body).map(e => e[1]);
  // console.log(req.body);
  console.log(cols);
  console.log(vals);
  // console.log(vals2);
  ingredient.create(cols, vals)
    .then(results => {
      // console.log(results);
      res.json({ id: results.insertId });
    })
    .catch(err => {
      console.log(err);
    });
});
router.put("/api/ingredients/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  ingredient.update({
    price: req.body.price
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
