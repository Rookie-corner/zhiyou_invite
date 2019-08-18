import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import {PropTypes} from 'prop-types'

export default class HeaderSelector extends Component{
    static propTypes={
        handleHeader:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state={
            icon:''
        }
        this.headerImages=[]
        for(let i=0;i<20;i++){
            this.headerImages[i]={}
            this.headerImages[i].text='头像'+(i+1)
            this.headerImages[i].icon=require(`../../assets/images/${this.headerImages[i].text}.png`)
            // const text=`头像${i+1}`
            // this.headerImages.push({text,icon:require(`../../assets/images/${text}.png`)})
        }
    }
    handleClick=(el)=>{
        this.setState({icon:el.icon})
        this.props.handleHeader(el.text)
    }
    render(){
        const listHeader=!this.state.icon?'请选择头像':(<div>已选择头像：<img src={this.state.icon} alt=""/></div>)
        return(
            <div>
                <List renderHeader={() =>listHeader } className="my-list">
                    <Grid data={this.headerImages} columnNum={5} onClick={(el)=>this.handleClick(el)}></Grid>
                </List>
            </div>
        )
    }
}