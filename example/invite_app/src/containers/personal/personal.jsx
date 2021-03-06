import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'


import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief


class Personal extends Component{
    logout=()=>{
        Modal.alert('退出登录', '确认退出登录?', [
            { text: '取消',style: 'default' },
            { text: '确认', onPress: () => {
                Cookies.remove('userid')
                this.props.resetUser()
            } },
          ]);
    }
    render(){
        const {username, header, post, info, salary, company}=this.props.user
        return(
            <div style={{marginBottom:'55px',marginTop:'45px'}}>
                <Result
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
                    title={username}
                    message={company}/>
                <List renderHeader={() => '相关信息'}>
                    <Item multipleLine>
                        <Brief>职位: {post}</Brief>
                        <Brief>简介: {info}</Brief>
                        {salary?(<Brief>薪资: 20k</Brief>):null}
                    </Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                    <Button type='warning' onClick={this.logout}>退出登录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {resetUser}
)(Personal)