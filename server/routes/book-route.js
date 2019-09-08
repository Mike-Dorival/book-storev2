const app = require("express")();
const data = require("../booksList");

app.get("/books", (req, res) => {
  res.status(200).json(data.books);
});

module.exports = app;
