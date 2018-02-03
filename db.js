const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "dude",
    password: "dude123",
    database: "library"
});
connection.connect(function (err) {
    if (err) throw err;
});
module.exports = connection;