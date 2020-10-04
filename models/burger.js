// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm");

var burger = {
  read: function (cb) {
    orm.read("burgers", function (res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: (cols, vals) => orm.create("burgers", cols, vals),

  update: (objColVals, condition) => orm.update("burgers", objColVals, condition, function (res) {
    cb(res);
  }),
  delete: condition => orm.delete("burgers", condition, function (res) {
    cb(res);
  })
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
