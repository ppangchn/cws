import React, { Component } from "react";
import InstantItem from './InstantItem'

class Instant extends Component {
  render() {
      const {instant,company,category} = this.props
    return (
      <tbody>
        {instant.map((i,index) => {
          return (
            <InstantItem key={index} item={i} getData={this.props.getData} company={company} category={category}/>
          );
        })}
      </tbody>
    );
  }
}

export default Instant;
