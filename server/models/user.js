var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  "userId":{type:String,required:true},
  "userName":{type:String,required:true},
  "userPwd":{type:String,required:true},
  "orderList":Array,
  "cartList":[
    {
      "proId":String,
      "proName":String,
      "price":String,
      "checked":String,
      "proNum":String,
      "proIntro":String,
      "before":Number,
      "proImg":String,
      "catagory":String,

    }
  ],
  "level":String,
  "addressList":Array,
  "collectionList":Array,
  "telephoneNum":String
});

module.exports = mongoose.model("Users",userSchema);
