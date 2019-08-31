const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Book = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("books", Book);
