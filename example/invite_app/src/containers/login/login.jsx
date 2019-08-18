import React,{Component} from 'react'
import {
    NavBar,
    WingBlank,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'
import '../../assets/css/index.less'


class Login extends Component{
    state={
        username:'',
        password:'',
    }
    login=()=>{
        this.props.login(this.state)
    }
    handleClick=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    toRegister=()=>{
        this.props.history.replace('/register')
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
                    <InputItem type='password' placeholder='请输入密码' onChange={val=>this.handleClick('password',val)}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登录</Button>
                    <WhiteSpace/>
                    <Button  onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>state.user,
    {login}
)(Login)