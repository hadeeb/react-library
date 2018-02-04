const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "library"
});
connection.connect(function (err) {
    if (err) throw err;
});
module.exports = connection;
