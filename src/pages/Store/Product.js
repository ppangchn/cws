import React, { Component } from "react";
import { Button } from "reactstrap";
import "../../css/Store/Product.css";
class Product extends Component {
  constructor() {
    super();
    this.state = { id: "", name: "", price: "" };
  }
  putinItemList() {
    const { id, name, price ,type} = this.state;
    const data = {
      id: id,
      name: name,
      price: price,
      type: type
    };
    console.log('data',data)
    this.props.putProductInItemList(data);
  }
  componentDidMount() {
    const { id, name, price ,type} = this.props;
    this.setState({id,name,price,type})
  }
  render() {
    const { name } = this.state;
    return (
      <Button color="productpink" onClick={() => this.putinItemList()}>
        {name}
      </Button>
    );
  }
}

export default Product;
