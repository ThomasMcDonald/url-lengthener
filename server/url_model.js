const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  title: String,
  lengthenedUrl: String,
  originalUrl: String,
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;