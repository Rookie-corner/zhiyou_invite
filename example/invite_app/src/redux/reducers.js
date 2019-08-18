import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,REVEIVE_USER_LIST, RECEIVE_MGS_LIST,MSG_READ,RECEIVE_MSG} from './action-types'
import {getRedirectTo} from '../utils/index'

// const initUser = {
//     username: '',     // 用户名
//     type: '',           // 类型
//     msg: '',            // 错误提示信息
// }

function user(state={},action){
    switch(action.type){
        case AUTH_SUCCESS:
            let {type,header}=action.data
            return {...action.data,redirectTo:getRedirectTo(type,header)}
        case ERROR_MSG:
            return {msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {msg:action.data}
        default:
            return state
    }
}

function userList(state=[],action){
    switch(action.type){
        case REVEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    chatMsgs: [], // 消息数组[{from: id1, to: id2}{}]
    users: {}, // 所有用户的集合对象{id1: user1, id2: user2}
    unReadCount: 0 // 未读消息的数量
}

function chat(state=initChat,action){
    switch (action.type){
        case RECEIVE_MGS_LIST:
            let {users,chatMsgs,userid}=action.data
            // console.log({users,chatMsgs})
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal+((!msg.read&&msg.to===userid)?1:0),0)
            }
        case RECEIVE_MSG:
            const {chatMsg}=action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
                const {count,from,to}=action.data
                return {
                    users:state.users,
                    chatMsgs:state.chatMsgs.map(msg=>{
                        if(msg.from===from&&msg.to===to&&!msg.read){
                            return {...msg,read:true}
                        }else{
                            return msg
                        }
                    }),
                    unReadCount:state.unReadCount-count
                }
        default:
            return state
    }
}



export default combineReducers(
    {
        user,
        userList,
        chat
    }
)