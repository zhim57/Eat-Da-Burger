// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm");

var ingredient = {
  read: function(cb) {
    orm.read("ingredients", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: (cols, vals) => orm.create("ingredients", cols, vals),

  update: (objColVals, condition) => orm.update("ingredients", objColVals, condition,function(res){
    cb(res);
  }),
  delete: condition => orm.delete("ingredients", condition, function(res){
    cb(res);
  })
};

// Export the database functions for the controller (catsController.js).
module.exports = ingredient;