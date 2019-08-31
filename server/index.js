const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const booksRoute = require("./routes/book-route");
const usersRoute = require("./routes/user-route");
const PORT = 1408;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", booksRoute);
app.use("/auth", usersRoute);

mongoose.connect("mongodb://localhost:27017/bookStore", {
  useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected MongoDB !");
});

app.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});
