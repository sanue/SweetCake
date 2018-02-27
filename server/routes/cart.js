let express = require('express');
let router =  express.Router();
let Cart = require('../models/cart');
let User = require('../models/user');
router.get('/a', (req, res, next)=> {
  res.send('respond with a resource');
});
router.post('/deleteCartItem',(req,res,next)=>{
    let userId =req.cookies.userId;
    User.findOne({userId :userId},(err,userDoc)=>{
      if(err){
        res.json({
          statu:"1",
          msg:err.message
        })
      }else{
        console.log("userDoc:"+userDoc)
      }
    })

});
