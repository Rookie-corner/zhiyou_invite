import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,REVEIVE_USER_LIST,RECEIVE_MGS_LIST,RECEIVE_MSG,MSG_READ} from './action-types'
import {reqRegister,reqLogin,reqUpdataUser,reqGetUser,reqGetUserList,reqChatMsgList,reqReadMsg} from '../api/index'
import io from 'socket.io-client'
import { async } from 'q';

const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
const receiveUserList=(userList)=>({type:REVEIVE_USER_LIST,data:userList})
const receiveMsgList=({users,chatMsgs,userid})=>({type:RECEIVE_MGS_LIST,data:{users,chatMsgs,userid}})
const receiveMsg=({chatMsg,userid})=>({type:RECEIVE_MSG,data:{chatMsg,userid}})
const msgRead=({count,from,to})=>({type:MSG_READ,data:{count,from,to}})


function initIo(dispatch,userid){
    if(!io.socket){
        io.socket=io('ws://localhost:4000')
        io.socket.on('receiveMsg',function(chatMsg){
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(receiveMsg({chatMsg,userid}))
                // console.log('客户端接收服务器发送的消息',chatMsg)
            }
        })
    }
}

export function sendMsg({from,to,content}){
    return async dispatch=>{
        io.socket.emit('sendMsg',{from,to,content})
    }
}

export function readMsg(from,to){
    return async dispatch=>{
        const response=await reqReadMsg(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            dispatch(msgRead({count,from,to}))
        }
    }
}
async function getMsgList(dispatch,userid){
    initIo(dispatch,userid)
    const response=await reqChatMsgList()
    const result=response.data
    if(result.code===0){
        const {users,chatMsgs}=result.data
        dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}

export function register(user){
    const {username,password,password1,type}=user
    if(!username||!password||!type){
        return errorMsg('用户名密码必须输入！！！')
    }
    if(password!==password1){
        return errorMsg('密码和确认密码不相同！！！')
    }
    return async dispatch=>{
        const response=await reqRegister({username,password,type})
        const result=response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export function login(user){
    const {username,password}=user
    if(!username || !password){
        return errorMsg('用户名密码必须输入！！！')
    }
    return async dispatch=>{
        const response=await reqLogin({username,password})
        const result=response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}

export function updata(user){
    return async dispatch=>{
        const response=await reqUpdataUser(user)
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

export function getUser(){
    return async dispatch=>{
        const response=await reqGetUser()
        const result=response.data
        // console.log(result.data)
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

export function getUserList(type){
    return async dispatch=>{
        const response=await reqGetUserList(type)
        const result=response.data
        if(result.code===0){
            // getMsgList(dispatch)
            dispatch(receiveUserList(result.data))
        }
    }
}

