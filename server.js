const express = require("express");
const fs = require("fs");

const app = express();

app.set("port", process.env.PORT || 3001);
console.log("Env : "+process.env.NODE_ENV);
// Express only serves static assets in production

if (process.env.NODE_ENV === "production") {
    console.log("prod");
    app.use(express.static("client/build"));
}

app.get("/booklist", (req,res) => {
    console.log("Test2");
});
app.get("/booklist", (req,res) => {
    console.log("Test2");
});
app.post("/booklist", (req,res) => {
    console.log("Test2");
});
app.post("/booklist", (req,res) => {
    console.log("Test2");
});
app.get("/viewbook/:id", (req,res) => {
    res.send("Book "+req.params.id);
});
app.get("/viewauthor/:id", (req,res) => {
    res.send("Author "+req.params.id);
});
app.get("/",(req,res) => {
   res.send("HomePage");
});
app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});