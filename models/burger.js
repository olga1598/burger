//Dependecies

var orm = require("../config/orm.js");

var burger = {
    selectAll: function(cb) {
        orm.selectAll("burgers", function(result) {
            cb(result);
        });
    },
    //create for creating a new burger
    create: function (col1, col2, newBurgerName, cb) {
        // EXAMPLE QUERY STRING
        // "INSERT INTO burgers(burger_name,devoured) VALUES (?,?)"
        orm.create("burgers", col1, col2, newBurgerName, function (res) {
            cb(res);
        });
    },
    // update for changing the burger status
    update: function (col, val, id, cb) {
        // EXAMPLE QUERY STRING
        // "UPDATE burgers SET devoured= true WHERE ?;"
        orm.update("burgers", col, val, id, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;