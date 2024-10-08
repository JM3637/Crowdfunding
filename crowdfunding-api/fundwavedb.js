var dbDetails = require("./fundwavedb-details");
var mysql = require("mysql2");
var bodyparser = require("body-parser");
var http = require("http");

module.exports ={
    getconnection:() => {
        return mysql.createConnection({
            host:dbDetails.host,
            user:dbDetails.user,
            password:dbDetails.password,
            database:dbDetails.database
        });
    }
}