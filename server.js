const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require('body-parser');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: false
}));
app.use(express.json());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    console.log("prod");
    app.use(express.static("client/build"));
}

// Load database conncetion
const db = require("./db");

//Get the list of all books
app.get("/booklist", (req,res) => {
    db.query("SELECT * FROM book", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//Get the list of all authors
app.get("/authorlist", (req, res) => {
    db.query("SELECT * FROM author", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//Add a book to database
app.post("/addbook", (req, res) => {
    const name = req.body.name,
        author = req.body.author,
        isbn = req.body.isbn,
        about = req.body.about;

    db.query(`INSERT INTO book (name,author,isbn,about) VALUES ('${name}','${author}','${isbn}','${about}')`,
        function (err, result) {
            if (err) throw err;
            res.send("OK");
        }
    );

});

//Add an author to database
app.post("/addauthor", (req, res) => {
    const name = req.body.name,
        age = req.body.age,
        gender = req.body.gender,
        born = req.body.born,
        about = req.body.about;
    db.query(`INSERT INTO author (name,age,gender,born,about) VALUES ('${name}','${age}','${gender}','${born}','${about}')`,
        function (err, result) {
            if (err) throw err;
            res.send("OK");
        }
    );
});

// Get details of a book
app.get("/viewbook/:id", (req,res) => {
    db.query("SELECT * FROM book WHERE id = " + mysql.escape(req.params.id), function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//Get Books by an author
app.get("/viewauthor/:id", (req,res) => {
    db.query("SELECT * FROM book WHERE author = " + mysql.escape(req.params.id), function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

//Get Profile of an author
app.get("/authorprofile/:id", (req, res) => {
    db.query("SELECT * FROM author WHERE id = " + mysql.escape(req.params.id), function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/",(req,res) => {
   res.send("Client loading");
});
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});