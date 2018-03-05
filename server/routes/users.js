var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.send('respond with a resource');
});
router.post('/loginIn',(req, res, next)=>{
  var param = {
    userName :req.body.userName,
    userPwd : req.body.userPwd
  }
  User.findOne(param,(err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
        if(doc){
          //往服务器端写cookie
          res.cookie("userId",doc.userId,{
            path:'/',
            maxAge:1000*60*60
          });
          //req.session.user = doc;
          res.json({
            status:'0',
            msg:'',
            result:{
              userName:doc.userName
            }
          });
        }
    }
  })


});
//这个router是挂载在/user模块下的,所以请求路径是 localhost:8080/users/logout
router.post("/logout",(req,res,next)=>{
  /*res.cookie("userId","",{
    path:"/",
    maxAge:-1
  })*/
  res.clearCookie('userId', { path: '/' });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})
//当前用户的购物车
router.get('/currentCarts',(req,res,next)=>{
  let userId = req.param("userId");
  let UserModel = User.find({userId:userId});
  UserModel.exec( (err,doc)=>{
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
//注册
router.post("/reg",(req,res,next)=>{
  var params = {
    userName :req.body.userName,
    userPwd : req.body.userPwd,
    telephoneNum : req.body.telephoneNum,
  }
  var UserDoc = new User(params);
  UserDoc.save((err,doc)=>{
      if(err){
        console.log(err);
      }else{
        console.log('成功插入数据');
      }
    })




})
router.post('/getCurrentUser',(req,res,next)=>{
  if(req.cookies.userId){
    let param = {
      userId :req.cookies.userId
    };
    User.findOne(param,(err,doc)=>{
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
            userInfo:doc
          }
        })
      }
    });
  }else{
    res.json({
      status:'1',
      msg:'请登录'
    })
  }


})
//商品数量改变
router.post('/changeProNum',(req,res,next)=>{
    let proId =req.body.proId;
    let proNum = req.body.proNum;
    let userId =req.cookies.userId;
    console.log(proId+":proisad");
  let UserModel = User.findOne({'userId':userId},(err,userDoc)=>{

    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      userDoc.cartList.forEach((item)=>{
        if(item.proId ==proId){
          item.proNum = proNum
        }
      })
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
            result:'success'
          })
        }
      })

        /*if(err2){
          res.json({
            status:'1',
            msg:err2.message
          })
        }else{
          proDoc.proNum = proNum;
          UserModel.save((err3,doc)=>{
            if(err3){
              res.json({
                status:'1',
                msg:err3.message
              })
            }else{
              res.json({
                status:'0',
                msg:'成功保存'
              })
            }
          })
        }*/

    }
  })




})
//删除某商品
router.post('/deleteCartItem',(req,res,next)=>{
  let userId =req.cookies.userId;
  let proId = req.body.proId;
  User.findOne({userId :userId},(err,userDoc)=>{
    if(err){
      res.json({
        statu:"1",
        msg:err.message
      })
    }else{
      let cartList = userDoc.cartList;
      let newCartList = [];
      cartList.forEach((item)=> {
        if (item.proId != proId) {
          newCartList.push(item);
        }
      })
      let updateInfo = {$set: {cartList: newCartList}};
      User.update({userId :userId},updateInfo,(err)=>{
        if (err) {
         res.json({
           status:"1",
           msg:err.message
         })
        } else {
          res.json({
            status:"0",
            msg:'success'
          })
        }
      })
    }

  })

});
module.exports = router;
