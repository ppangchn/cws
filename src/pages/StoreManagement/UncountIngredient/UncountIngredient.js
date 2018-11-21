import React, { Component } from "react";
import UncountIngredientItem from "./UncountIngredientItem";

class UncountIngredient extends Component {
  render() {
    const { uncountIngredient ,getData} = this.props;
    return (
      <tbody>
        {uncountIngredient.map((u, index) => {
          return (
            <UncountIngredientItem
              key={index}
              item={u}
              getData={getData}
            />
          );
        })}
      </tbody>
    );
  }
}

export default UncountIngredient;
