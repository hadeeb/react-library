const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.json());
// app.use(express.urlencoded());

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    console.log("prod");
    app.use(express.static("client/build"));
}

// Load database conncetion
let db = new sqlite3.Database('./library.db', (err) => {
    if (err) {
      console.error(err.message);
    }
  });

//Get the list of all books
app.get("/booklist", (req,res) => {
    db.all("SELECT book.id, book.name, author.name as author, book.isbn, book.about FROM book LEFT JOIN author on book.author = author.id",[], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Get the list of all authors
app.get("/authorlist", (req, res) => {
    db.all("SELECT * FROM author",[], function (err, result) {
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

    db.all(`INSERT INTO book (name,author,isbn,about) VALUES ('${name}','${author}','${isbn}','${about}')`,[],
        function (err) {
            if (err) throw err;
            res.send("OK");
        }
    );

});

// select book.id , book.name , author.name from book left join author on book.author = author.id;
//Add an author to database
app.post("/addauthor", (req, res) => {
    const name = req.body.name,
        age = req.body.age,
        gender = req.body.gender,
        born = req.body.born,
        about = req.body.about;
    db.run(`INSERT INTO author (name,age,gender,born,about) VALUES ('${name}','${age}','${gender}','${born}','${about}')`,[],
        function (err) {
            if (err) throw err;
            res.send("OK");
        }
    );
});

// Get details of a book
app.get("/viewbook/:id", (req,res) => {
    db.get("SELECT book.id, book.name, author.name as author, book.isbn, book.about FROM book LEFT JOIN author on book.author = author.id WHERE book.id = " +(req.params.id), function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Get Books by an author
app.get("/viewauthor/:id", (req,res) => {
    db.all("SELECT * FROM book WHERE author = " +(req.params.id), function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//Get Profile of an author
app.get("/authorprofile/:id", (req, res) => {
    db.all("SELECT * FROM author WHERE id = " + (req.params.id), function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// For react-router
app.get("/*",(req,res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
// Clear DB
app.get("/resetdb",(req,res)=>{
    const resetdb = require('./setupdb');
    resetdb(db);
    res.send("DB cleared");
});
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
