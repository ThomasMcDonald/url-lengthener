const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  hostName: String,
  lengthenedUrl: String,
  originalUrl: String,
});

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;