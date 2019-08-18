const mongoose=require('mongoose')
const md5=require('blueimp-md5')

mongoose.connect('mongodb://127.0.0.1:27017/db_guigu')
const conn=mongoose.connection
conn.on('connected',function(){
    console.log('数据库连接成功！！！')
})

const userSchema=mongoose.Schema({
    username:{type:'String',required:true},
    password:{type:'String',required:true},
    type:{type:'String',required:true}
})
const UserModel=mongoose.model('users',userSchema)
//添加数据
function testSave(){
    const user={
        username:'李四',
        password:'123456',
        type:'招聘者'
    }
    const userModel=new UserModel(user)
    userModel.save(function(err,user){
        console.log('save()',err,user)
    })
}
// testSave()

//查询数据

function testFind(){
    UserModel.find(function(error,users){
        console.log('testFind()',error,users)
    })
    UserModel.findOne({_id: '5d47a8c5dbaf1814c05414eb'},function(error,user){
        console.log('testFindOne()',error,user)
    })
}
// testFind()


//更新数据
function testUpdata(){
    UserModel.findOneAndUpdate({_id: '5d47a8c5dbaf1814c05414eb'},{username:'jack'},
    function(error,oldUser){
        console.log('testUpdata()',error,oldUser)
    })
}
// testUpdata()


//删除数据

function testDelete(){
    UserModel.remove({_id: '5d47a8c5dbaf1814c05414eb'},function(error,user){
        console.log('testDelete()',error,user)
    })
}
// testDelete()