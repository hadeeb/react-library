const router = require("express").Router();
const sqlite3 = require("sqlite3").verbose();

// Load database conncetion
const db = new sqlite3.Database("./library.db", err => {
  if (err) {
    console.error(err.message);
  }
});

//Get the list of all books
router.get("/booklist", (req, res) => {
  db.all(
    "SELECT book.id, book.name, author.name as author, book.isbn, book.about FROM book LEFT JOIN author on book.author = author.id",
    [],
    function(err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Get the list of all authors
router.get("/authorlist", (req, res) => {
  db.all("SELECT * FROM author", [], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//Add a book to database
router.post("/addbook", (req, res) => {
  const name = req.body.name,
    author = req.body.author,
    isbn = req.body.isbn,
    about = req.body.about;

  db.all(
    `INSERT INTO book (name,author,isbn,about) VALUES ('${name}','${author}','${isbn}','${about}')`,
    [],
    function(err) {
      if (err) throw err;
      res.send("OK");
    }
  );
});

// select book.id , book.name , author.name from book left join author on book.author = author.id;
//Add an author to database
router.post("/addauthor", (req, res) => {
  const name = req.body.name,
    age = req.body.age,
    gender = req.body.gender,
    born = req.body.born,
    about = req.body.about;
  db.run(
    `INSERT INTO author (name,age,gender,born,about) VALUES ('${name}','${age}','${gender}','${born}','${about}')`,
    [],
    function(err) {
      if (err) throw err;
      res.send("OK");
    }
  );
});

// Get details of a book
router.get("/viewbook/:id", (req, res) => {
  db.get(
    "SELECT book.id, book.name, author.name as author, book.isbn, book.about FROM book LEFT JOIN author on book.author = author.id WHERE book.id = " +
      req.params.id,
    function(err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
});

//Get Books by an author
router.get("/viewauthor/:id", (req, res) => {
  db.all("SELECT * FROM book WHERE author = " + req.params.id, function(
    err,
    result
  ) {
    if (err) throw err;
    res.send(result);
  });
});

//Get Profile of an author
router.get("/authorprofile/:id", (req, res) => {
  db.all("SELECT * FROM author WHERE id = " + req.params.id, function(
    err,
    result
  ) {
    if (err) throw err;
    res.send(result);
  });
});

// Clear DB
router.get("/resetdb", (req, res) => {
  const resetdb = require("./setupdb");
  resetdb(db);
  res.send("DB cleared");
});

module.exports = router;
