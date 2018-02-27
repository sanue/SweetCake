/*var fs = require('fs');
var express = require('express');
var multer  = require('multer')
let router =  express.Router();
*/
/*
router.get('/aaa',(req,res,next)=>{
  res.send('respond with a resource');
})

var createFolder = function(folder){
  try{
    fs.accessSync(folder);
  }catch(e){
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.fieldname + '-' + Date.now());
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })



// 单图上传
router.post('/', upload.single('logo'), (req, res, next)=>{
  var file = req.file;
  res.send({ret_code: '0'});
});
*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
  console.log("12321321");
  res.send('respond with a resource');
});


module.exports = router;
