const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
// app.use(express.urlencoded());

app.set("port", process.env.PORT || 3001);

const isProd = process.env.NODE_ENV === "production";

// Express only serves static assets in production
if (isProd) {
  console.log("prod");
  app.use(express.static("client/build"));
}

app.use("/api", require("./api"));

// For react-router
if (isProd) {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
