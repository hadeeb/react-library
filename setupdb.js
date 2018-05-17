module.exports = function resetdb(db){
    db.serialize(function(){
        db.run(`DROP TABLE IF EXISTS book`);
        db.run(`DROP TABLE IF EXISTS author`);
        db.run(`
        CREATE TABLE author (
            id integer NOT NULL PRIMARY KEY
          ,  name varchar(32) NOT NULL
          ,  age integer NOT NULL
          ,  gender integer NOT NULL
          ,  born varchar(20) NOT NULL
          ,  about varchar(300) NOT NULL
          )`
        );
        db.run(`
        CREATE TABLE book (
            id integer NOT NULL PRIMARY KEY
          ,  name varchar(32) NOT NULL
          ,  author integer NOT NULL
          ,  isbn integer NOT NULL
          ,  about varchar(300) NOT NULL
          ,  CONSTRAINT book_ibfk_1 FOREIGN KEY (author) REFERENCES author (id) ON UPDATE CASCADE
          )`
        );
    });
};

