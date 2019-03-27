// Object Relational Mapper (ORM)

//Import (require) `connection.js` into `orm.js`

var connection = require("../config/connection.js");
//DIFF var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}
// DIFF : //Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
//   var arr = [];

// //Loop through the keys and push the key/value as a string int arr
//   for (var key in ob) {
//       //Check to skip hidden properties
//       if (Object.hasOwnProperty.call(ob, key)) {
//           // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
//           // e.g. {sleepy: true} => ["sleepy=true"]
//           arr.push(key + "=" + ob[key]);
//       }
//   }
//   //Translate array of strings to a single comma-separated string
//   return arr.toString();
// }



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
    // selectAll: function(tableName, cb) {
    //   var queryString = "SELECT * FROM ??";
    //   connection.query(queryString, [tableName], function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     cb(result);
    //   });
    // },

    //user adds the burger to our list
    create: function(tableName, cols, vals, cb) {
      console.log(vals);
      var queryString = "INSERT INTO " + tableName;
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log('queryString', queryString);
  
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // insertOne: function(tableName, col1, col2, val1, val2, cb) {
    //     //var queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (?)";
    //   var queryString = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
    //   console.log(queryString);
    //   connection.query(queryString, [tableName, col1, col2, val1, val2], function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     cb(result);
    //   });
    // },


    //objColVals would be the columns and values that you want to update
    //an example of objColVals would be {burger_name: name, devour: true}
    update: function(table, objColVals, condition, cb) {
      console.log("PRIVET");
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log("update: ", queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
      //     updateOne: function (id, cb) {
    //         var queryString = "UPDATE burgers SET devoured = true WHERE id = ?";
    //         connection.query(queryString, [id], function (err, result) {
    //             if (err) {
    //                 throw err;
    //             }
    //             cb(result);
    //         });
    //      }
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
  

