//Dependecies

var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },
    // The variables colNames and colValues are arrays.
    create: function(colNames, colValues, cb) {
        orm.create("burgers", colNames, colValues, function(result) {
            cb(result);
        });
    },
      // updateOne for changing the burger status
    update: function(objColVals, condition, cb) {
        orm.update('burgers', objColVals, condition, function(result) {
          cb(result);
        });
    }
};

module.exports = burger;