// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Product', new Schema({
  name: String,
  sku: String,
  description: String,
  price: Number,
  images: Array
}));