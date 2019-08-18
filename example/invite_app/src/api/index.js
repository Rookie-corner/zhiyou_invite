import ajax from './ajax'

export const reqRegister=(user)=>ajax('/register',user,'POST')
export const reqLogin=(user)=>ajax('/login',user,'POST')
export const reqUpdataUser=(user)=>ajax('/updata',user,'POST')
export const reqGetUser=()=>ajax('/user')
export const reqGetUserList=(type)=>ajax('/userlist',type)
export const reqChatMsgList=()=>ajax('/msglist')
export const reqReadMsg=(from)=>ajax('/readmsg',{from},'POST')