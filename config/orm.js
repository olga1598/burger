// Object Relational Mapper (ORM)

//Import (require) `connection.js` into `orm.js`

var connection = require("../config/connection.js");

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
var orm = {
    //select all the burgers from our table
    selectAll: function(tableName, cb) {
      var queryString = "SELECT * FROM " + tableName + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    //User will create a new burger
    create: function (tableName, col1, col2, newBurgerName, cb) {
      let queryString = "INSERT INTO " + tableName;
      queryString += "(" + col1 + "," + col2 + ") VALUES (?,?)";
      connection.query(queryString, [newBurgerName, false],
          function (err, res) {
              if (err) throw err;
              cb(res);
          })
    },

    //Move the burger into the eaten list of burgers
    update: function (tableName,col,val, id, cb) {
      let queryString = "UPDATE " + tableName;
      queryString += " SET " + col + " = " + val + " WHERE ?";

      connection.query(queryString,
          { id: id },
          function (err, res, fields) {
              if (err) throw err;
              cb(res);
          })
    },

    
    delete: function(tableName, condition, cb) {
      var queryString = "DELETE FROM " + tableName;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
  };
  
  module.exports = orm;
  

