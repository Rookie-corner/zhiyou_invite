import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Hunter extends Component{
    componentDidMount(){
        this.props.getUserList({type:'招聘者'})
    }
    render(){
        return(
            <div>
                <UserList userList={this.props.userList}/>
            </div>
        )
    }
}
export default connect(
    state=>({userList:state.userList}),
    {getUserList}
)(Hunter)