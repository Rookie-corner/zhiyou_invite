import React,{Component} from 'react'
import {NavBar,List,InputItem,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'


import {sendMsg,readMsg} from '../../redux/actions'

const Item=List.Item

class Chat extends Component{
    state={
        content:'',
        isShow:false
    }
    componentWillMount(){
        this.emojis=['😀','😃','😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃','😉',
                    '😊','😇', '🥰','😍','🤩','😘','😗','😚','😙','😋','😛','😜','🤪','😝','🤑',
                    '🤗','🤭','🤫','🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬','🤥','😌',
                    '😔','😪','🤤','😴','😷','🤒','🤕','🤢','🤮','🤧','🥵','🥴','😵','🤯','🤠',
                    '🥳','😎','🤓','🧐','😕','😟','🙁','😮','😯','😲','😳','🥺','😦','😧','😨',
                    '😰','😥','😢','😭','😱','😖','😣','😞','😓','😩','😫','😤','😡','😠',]
        this.emojis= this.emojis.map(item=>({text:item}))
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
    }
    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {                      // 异步手动派发resize 事件,解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    handleSend=()=>{
        const content=this.state.content.trim()
        const to=this.props.match.params.userid
        const from=this.props.user._id
        if(this.state.content){
            this.props.sendMsg({from,to,content})
            this.setState({content:'',isShow:false})
        } 
    }
    handleQuit=()=>{
        let from=this.props.match.params.userid
        let to=this.props.user._id
        this.props.readMsg(from,to)
    }
    render(){
        const {user}=this.props
        const {chatMsgs,users}=this.props.chat
        const targetId=this.props.match.params.userid
        if(!users[targetId]){
            return null
        }
        const meId=user._id
        const chatId=[targetId,meId].sort().join('_')
        const msgs=chatMsgs.filter(msg=>msg.chat_id===chatId)
        // debugger
        const targetIcon=users[targetId]?require(`../../assets/images/${users[targetId].header}.png`):null
        return (
            <div id='chat-page'>
            <NavBar className='static-header' icon={<Icon type='left'/>} onClick={this.handleQuit} onLeftClick={() => {this.props.history.goBack()}} >
            {users[targetId].username}
            </NavBar>
            <List style={{marginBottom:'50px', marginTop:'50px'}}>
                <QueueAnim>
            {
                msgs.map(msg => {
                    if(msg.from===targetId) {
                        return (
                            <Item key={msg._id} thumb={targetIcon} >
                            {msg.content}
                            </Item>
                        )
                    } else {
                        return (
                        <Item key={msg._id} className='chat-me' extra='我'>
                        {msg.content}
                        </Item>
                        )
                    }
                 })
            }
            </QueueAnim>
            </List>
            <div className='am-tab-bar'>
            <InputItem placeholder="请输入" value={this.state.content} 
            onFocus={()=>this.setState({isShow:false})}
            onChange={val => this.setState({content: val})}  
            extra={<span>
                <span onClick={this.toggleShow} style={{marginRight:10}}>😀</span>
                <span onClick={this.handleSend}>发送</span>
            </span>}/> 
            {
                this.state.isShow?(
                    <Grid
                        data={this.emojis}
                        columnNum={8}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={(item)=>{this.setState({content:this.state.content+item.text})}}
                    />):null}
            </div>
            </div>
            )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)