import React, { Component } from "react";
import MaterialItem from './MaterialItem'
class Material extends Component {
  render() {
      const {material} = this.props
    return (
      <tbody>
        {material.map((m,index) => {
          return (
            <MaterialItem key={index} item={m} getData={this.props.getData}/>
          );
        })}
      </tbody>
    );
  }
}
export default Material;
