import React, { Component } from "react";
import Product from "./Product";

class ProductList extends Component {
  constructor() {
    super();
    this.state = { productList: [] };
  }
  componentWillReceiveProps(props) {
    const { productList } = props;
    this.setState({ productList });
  }
  render() {
    const { productList } = this.state;
    console.log('productList',productList)
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {productList.map(p => {
          return (
            <Product
              key={p.Product_ID}
              id={p.Product_ID}
              name={p.Name}
              price={p.Price}
              type={p.Type}
              putProductInItemList={this.props.putProductInItemList}
            />
          );
        })}
      </div>
    );
  }
}
export default ProductList;
