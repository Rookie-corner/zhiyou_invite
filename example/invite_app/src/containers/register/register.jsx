import React,{Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'
import '../../assets/css/index.less'


class Register extends Component{
    state={
        username:'',
        password:'',
        password1:'',
        type:'求职者'
    }
    register=()=>{
        this.props.register(this.state)
    }
    handleClick=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    toLogin=()=>{
        this.props.history.replace('/login')
    }
    render(){
        if(this.props.redirectTo){
            return <Redirect to={this.props.redirectTo} />
        }
        return(
            <div>
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                {this.props.msg? <p className='error-msg'>{this.props.msg}</p> : null}
                <WingBlank>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入用户名' onChange={val=>this.handleClick('username',val)}>用户名：</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入密码' type='password' onChange={val=>this.handleClick('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入确认密码' type='password' onChange={val=>this.handleClick('password1',val)}>确认密码：</InputItem>
                    <WhiteSpace/>
                    <List.Item>
                        <span>用户类型：</span>
                        &nbsp;
                        <Radio checked={this.state.type==='求职者'} onChange={val=>this.handleClick('type','求职者')}>求职者</Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={this.state.type==='招聘者'} onChange={val=>this.handleClick('type','招聘者')}>招聘者</Radio>
                    </List.Item>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.register}>注册</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>state.user,
    {register}
)(Register)