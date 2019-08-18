var express = require('express');
var router = express.Router();
let md5=require('blueimp-md5')
let {UserModel,ChatModel}=require('../db/models')
let filter={password:0,__v:0}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', function (req, res) {
  const {username, password,type} = req.body
  UserModel.findOne({username},function(error,user){
    if (user) {
      res.send({code: 1, msg: '此用户已存在'})
    } else {
      new UserModel({username, password:md5(password),type}).save(function(error,user){
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
        res.send({code: 0, data:{_id: user._id, username, type}})
      })
    }
  })
})

router.post('/login',function(req,res){
  const {username, password} = req.body
  UserModel.findOne({username,password:md5(password)},filter,function(error,user){
    if(user){
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'用户名或密码错误！！！'})
    }
  })
})


router.post('/updata',function(req,res){
  const user=req.body
  const userid=req.cookies.userid
  if(!userid){
    return res.send({
      code: 1,
      msg: "请先登陆"
    })
  }
  UserModel.findOneAndUpdate({_id:userid},user,function(error,oldUser){
    let {_id,username,type}=oldUser
    if(!oldUser){
      res.clearCookie(userid)
      res.send({
        code: 1,
        msg: "请先登陆"
      })
    }else{
      res.send({
        code: 0,
        data:Object.assign(user,{_id,username,type})
      })
    }
  })
})

router.get('/user',function(req,res){
  const userid=req.cookies.userid
  if(!userid){
    return res.send({
      code: 1,
      msg: "请先登陆"
    })
  }
  UserModel.findOne({_id:userid},filter,function(error,user){
    if(!user){
      res.clearCookie(userid)
      return res.send({
        code: 1,
        msg: "请先登陆"
      })
    }else{
      res.send({
        code: 0,
        data:user
      })
    }
  })
})

router.get('/userlist',function(req,res){
  const {type}=req.query
  UserModel.find({type},function(error,users){
    res.send({code:0,data:users})
  })
})

router.get('/msglist', function (req, res) {
  const userid = req.cookies.userid
  UserModel.find(function (err, userDocs) {
    const users = {} 
    userDocs.forEach(doc => {
    users[doc._id] = {username: doc.username, header: doc.header}
  })

  ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err,
  chatMsgs) {
  res.send({code: 0, data: {users, chatMsgs}})
  })
  })
})

router.post('/readmsg', function (req, res) {
  // 得到请求中的from 和to
  const from = req.body.from
  const to = req.cookies.userid
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err,
    doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // 更新的数量
    })
  })



module.exports = router;
