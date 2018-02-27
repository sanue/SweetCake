var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var fileUpload = require('./routes/fileUpload');
var fs = require('fs');
var multer  = require('multer');
var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置路由
app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);
app.use('/fileUpload', fileUpload);

// 处理捕获404
app.use((req, res, next)=> {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  alert('404')
});
//捕获是否登陆
app.use((req,res,next)=>{

});

// 捕获error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
