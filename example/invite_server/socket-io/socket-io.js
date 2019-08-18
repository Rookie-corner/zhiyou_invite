const {ChatModel} = require('../db/models')
module.exports = function (server) {
    const io = require('socket.io')(server)
    io.on('connection', function(socket) { 
    console.log('有客户端连接上了服务器')
    socket.on('sendMsg', function({from, to, content}) {
    console.log('服务器接收到数据', {from, to, content})
    const chat_id = [from, to].sort().join('_')
    const create_time = Date.now()
    const chatModel = new ChatModel({chat_id, from, to, create_time, content})
    chatModel.save(function (err, chatMsg) {
    // 保存完成后, 向所有连接的客户端发送消息
    io.emit('receiveMsg', chatMsg) // 全局发送, 所有连接的客户端都可以收到
    console.log('向所有连接的客户端发送消息', chatMsg)
})
})
})
}