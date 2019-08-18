import React,{Component} from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Recruiter extends Component{
    componentDidMount(){
        this.props.getUserList({type:'求职者'})
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
)(Recruiter)