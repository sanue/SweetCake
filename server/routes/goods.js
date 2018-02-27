let express = require('express');
let router =  express.Router();
let mongoose = require('mongoose');
let Goods = require('../models/goods');
//连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/gomall');
mongoose.connection.on("connected", ()=>{
  console.log("MongoDB connected success");
});
mongoose.connection.on("error",()=> {
  console.log("MongoDB connected fail");
})

mongoose.connection.on("disconnected",()=>{
  console.log("MongoDB connected disconnected");
})
//查询甜品
router.get("/lists", (req,res,next)=>{
  let params = {};
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let skip = (page-1)*pageSize;
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  if(req.param("sortByPrice")){
    let sortByPrice = req.param("sortByPrice");
    goodsModel.sort({'price':sortByPrice});
  }else if(req.param("sortByTimes")){
    let sortByTimes = req.param("sortByTimes");
    goodsModel.sort({'collectionTimes':sortByTimes})
  }else if(req.param("sortByStar")){
    //let sortByStar = req.param("sortByStar");
    goodsModel.find({"proStar":5 } );
  }else if(req.param("priceLevel")){

    let priceLevel = req.param("priceLevel");
    switch (priceLevel){
      case "1":goodsModel.find({price: {$gt: 0,$lt:200}});break;
      case "2":goodsModel.find({price: {$gt: 200,$lt:400}});break;
      case "3":goodsModel.find({price: {$gt: 400,$lt:600}});break;
      case "4":goodsModel.find({price: {$gt: 600,$lt:800}});break;
    }
  }else if(req.param("getCategories")){
    let getCategories = req.param("getCategories");
    switch (getCategories){
      case "1":goodsModel.find({catagory: '港式甜品'});break;
      case "2":goodsModel.find({catagory: '台式甜品'});break;
      case "3":goodsModel.find({catagory: '广府糖水'});break;
      case "4":goodsModel.find({catagory: '日式甜品'});break;
    }
  }
   goodsModel.exec( (err,doc)=>{
     if (err){
       res.json({
         status:'1',
         msg:err.message
       });
     }  else{
       res.json({
         status:'0',
         msg:'',
         result:{
           count:doc.length,
           list:doc
         }
       })
     }
  })

 //
 //

})
//加入购物车
router.post("/addCart",(req,res,next)=>{
    let productId = req.body.proId;
    let User = require('../models/user');
    if(req.cookies.userId){
      console.log("coo:"+req.cookies.userId);
      let userId = req.cookies.userId;
      User.findOne({userId:userId},(err,userDoc)=>{
        if(err){
          res.json({
            status:"1",
            msg:err.message
          })
        }else{
          if(userDoc){
            let goodsItemFlag = false;
            userDoc.cartList.forEach((item)=>{
              if(item.proId == productId ){
                item.proNum ++;
                goodsItemFlag = true;
              }
            })
            if(goodsItemFlag){
              userDoc.save((err2,doc2)=>{
                if(err2){
                  res.json({
                    status:"1",
                    msg:err2.message
                  })
                }else{
                  res.json({
                    status:'0',
                    msg:'',
                    result:'suc'
                  })
                }
              })
            }else{
              Goods.findOne({proId:productId},(err,doc)=>{
                if(err){
                  res.json({
                    status:"1",
                    msg:err.message
                  })
                }else{
                  if(doc){
                    doc.proNum = 1;
                    doc.checked = 1;
                    userDoc.cartList.push(doc);
                    userDoc.save((err2,doc2)=>{
                      if(err2){
                        res.json({
                          status:"1",
                          msg:err2.message
                        })
                      }else{
                        res.json({
                          status:'0',
                          msg:'',
                          result:'suc'
                        })
                      }
                    })
                  }
                }
              })
            }

          }
        }
      })
    }else{
      res.json({
        status:"1",
        msg:'加入失败,请先登陆'
      })
    }



})
//获取最新甜品
router.get("/getHotLists", (req,res,next)=>{
  let limitNum = parseInt(req.param("limitNum"));
  let goodsModel= Goods.find({}).sort({'_id':-1}).limit(8);
  goodsModel.exec( (err,doc)=>{
    if (err){
      res.json({
        status:'1',
        msg:err.message
      });
    }  else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
//获取最新五星甜品
router.get("/getStarLists", (req,res,next)=>{
  let limitNum = parseInt(req.param("limitNum"));
  let goodsModel= Goods.find({'proStar':5}).sort({'_id':-1}).limit(8);
  goodsModel.exec( (err,doc)=>{
    if (err){
      res.json({
        status:'1',
        msg:err.message
      });
    }  else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
//获取当前商品详情
router.get('/getCurrentSweetInfo',(req,res,next)=>{
  let proId = req.param("proId");
  let goodsModel= Goods.find({'proId':proId});
  goodsModel.exec((err,doc)=>{
    if (err){
      res.json({
        status:'1',
        msg:err.message
      });
    }  else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})


module.exports = router;
