import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,Button,TextareaItem,InputItem,WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updata} from '../../redux/actions'

class RecruiterInfo extends Component{
    state={
        header:'',                   // 头像名称
        post:'',                     // 职位
        info:'',                     // 个人或职位简介
        company:'',                  // 公司名称
        salary:''                    // 工资
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
                <NavBar>老&nbsp;板&nbsp;信&nbsp;息&nbsp;完&nbsp;善</NavBar>
                <HeaderSelector handleHeader={this.handleHeader}/>
                <WhiteSpace/>
                <InputItem onChange={(val)=>this.handleClick('post',val)}>招聘职位：</InputItem>
                <InputItem onChange={(val)=>this.handleClick('company',val)}>公司名称：</InputItem>
                <InputItem onChange={(val)=>this.handleClick('salary',val)}>职位薪资：</InputItem>
                <TextareaItem title='职位要求：' rows={3} onChange={(val)=>this.handleClick('info',val)}></TextareaItem>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {updata}
)(RecruiterInfo)