import React, { Component } from 'react'

class Articles extends Component {
    render(){
      return(
        <ul>
        {this.props.items.map(({title, post_route}, index) =>{ return <li style={{listStyle:"none"}} key = {index}><a href={"https://blog.risingstack.com"+post_route}>{title}</a></li>})}
      </ul>
      )
     
    }
  }

export default Articles