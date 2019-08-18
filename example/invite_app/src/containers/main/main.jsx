import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import HunterInfo from '../hunter-info/hunter-info'
import RecruiterInfo from '../recruiter-info/recruiterinfo'
import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import Hunter from '../hunter/hunter'
import Recruiter from '../recruiter/recruiter'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


class Main extends Component{
    navList = [
        {
            path: '/recruiter', // 路由路径
            component: Recruiter,
            title: '大神列表',
            icon: 'dashen',
            text: '大神',
        },
        {
            path: '/hunter', // 路由路径
            component: Hunter,
            title: '老板列表',
            icon: 'laoban',
            text: '老板',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',},
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
        ]
    componentDidMount(){
        const userid=Cookies.get('userid')
        const {_id}=this.props.user
        if(userid&& !_id){
            this.props.getUser()
        }
    }
    render(){
        const userid=Cookies.get('userid')
        const {user}=this.props
        if(!userid){
            return <Redirect to='/login'/>
        }
        if(!user._id){
            return null
        }else{
            let path=this.props.location.pathname
            if(path==='/'){
                path=getRedirectTo(user.type,user.header)
                return <Redirect to={path}/>
            }
        }
        const {navList}=this
        const path=this.props.location.pathname
        const currentNav=navList.find(nav=>path===nav.path)
        if(currentNav){
            if(user.type==='求职者'){
                navList[0].hide=true
            }else{
                navList[1].hide=true
            }
        }
        return(
            <div>
                {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {navList.map((nav,index)=><Route key={index} path={nav.path} component={nav.component} />)}
                    <Route path='/hunterinfo' component={HunterInfo} />
                    <Route path='/recruiterinfo' component={RecruiterInfo} />
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav?<NavFooter navList={this.navList} unReadCount={this.props.unReadCount}/>:null}
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)