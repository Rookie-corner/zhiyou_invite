import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,Button,TextareaItem,InputItem,WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updata} from '../../redux/actions'

class HunterInfo extends Component{
    state={
        header:'',                   // 头像名称
        post:'',                     // 职位
        info:'',                     // 个人或职位简介
    } 
    handleClick=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    handleHeader=(header)=>{
        this.setState({header})
    }
    save=()=>{
        // console.log(this.state)
        this.props.updata(this.state)
    }
    render(){
        const {header,type}=this.props.user
        if(header){
            const path=(type==='求职者')?'/hunter':'/recruiter'
            return <Redirect to={path}/>
        }
        return(
            <div>
                <NavBar>大&nbsp;神&nbsp;信&nbsp;息&nbsp;完&nbsp;善</NavBar>
                <HeaderSelector handleHeader={this.handleHeader}/>
                <WhiteSpace/>
                <InputItem onChange={(val)=>this.handleClick('post',val)}>求职岗位：</InputItem>
                <TextareaItem title='个人介绍：：' rows={3} onChange={(val)=>this.handleClick('info',val)}></TextareaItem>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {updata}
)(HunterInfo)