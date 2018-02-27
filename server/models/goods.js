var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  "proId":String,
  "proName":String,
  "proNum":Number,
  "checked":String,
  "price":Number,
  "before":Number,
  "proIntro":String,
  "proImg":String,
  "proStar":Number,
  "catagory":String,
  "collectionTimes":Number
});

module.exports = mongoose.model('goods',productSchema)
