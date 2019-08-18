import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs,userid){
    const lastMsgObjs={}
    chatMsgs.forEach(msg=>{
        if(userid===msg.to&&!msg.read){
            msg.unReadCount=1
        }else{
            msg.unReadCount=0
        }
        const chatId=msg.chat_id
        let lastMsg=lastMsgObjs[chatId]
        if(!lastMsg){
            lastMsgObjs[chatId]=msg
        }else{
            let unReadCount=lastMsg.unReadCount+msg.unReadCount
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId]=msg
            }
            lastMsgObjs[chatId].unReadCount=unReadCount
        }
    })
    const lastMsgs=Object.values(lastMsgObjs)
    lastMsgs.sort(function(m1,m2){
        return m2.create_time-m1.create_time
    })
    return lastMsgs
}
class Message extends Component {
    render() {
        const {user, chat} = this.props
        // 得到当前用户的id
        const meId = user._id
        // 得到所用用户的集合对象users 和所有聊天的数组
        const {users, chatMsgs} = chat
        // 得到所有聊天的最后消息的数组
        const lastMsgs = getLastMsgs(chatMsgs, meId)
        return (
            <List style={{marginTop:50, marginBottom: 50}}>
                {lastMsgs.map(msg => {
                    const targetId = msg.from === meId ? msg.to : msg.from
                    const targetUser = users[targetId]
                    const avatarImg = targetUser.header ?require(`../../assets/images/${targetUser.header}.png`) : null
                return (
                <Item key={msg._id} extra={<Badge text={msg.unReadCount}/>} 
                    thumb={avatarImg} arrow='horizontal' 
                    onClick={() => this.props.history.push(`/chat/${targetId}`)} >
                    {targetUser.username}
                    <Brief>{msg.content}</Brief>
                </Item> )
                })
            }
            </List>
            )
    }
}
export default connect(
    state => ({
    user: state.user,
    chat: state.chat
    })
)(Message)