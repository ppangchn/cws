import React, { Component } from "react";
import CountIngredientItem from './CountIngredientItem'

class CountIngredient extends Component {
  render() {
      const {countIngredient} = this.props;
    return (
      <tbody>
        {countIngredient.map(c => {
          return (
           <CountIngredientItem item={c} getData={this.props.getData}/>
          );
        })}
      </tbody>
    );
  }
}

export default CountIngredient;
