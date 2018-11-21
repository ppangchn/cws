import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ItemList from "./ItemList";
import ProductList from "./ProductList";
import axios from "axios";
import config from "../../config";

class Store extends Component {
  constructor() {
    super();
    this.state = { itemList: [], productList: [], itemNameList: [] };
  }
  async getData() {
    await axios.get(`${config.url}/getAllProducts`).then(res => {
      const { data } = res;
      this.setState({ productList: data.rows });
    });
  }
  componentDidMount() {
    this.getData();
  }
  putProductInItemList(product) {
    const { itemList, itemNameList } = this.state;
    if (itemNameList.indexOf(product.name) === -1) {
      itemList.push({
        productID: product.id,
        name: product.name,
        totalPrice: product.price,
        qty: 1,
        type: product.type
      });
      itemNameList.push(product.name);
    } else {
      const index = itemNameList.indexOf(product.name);
      let qty = itemList[index].qty;
      qty++;
      let newTotalPrice = product.price * qty;
      itemList[index].qty = qty;
      itemList[index].totalPrice = newTotalPrice;
    }
    console.log(itemList);
    this.setState({ itemList, itemNameList });
  }
  render() {
    const { productList, itemList } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row className="mb ml">
          <Col style={{ fontSize: "2vw" }}>Store</Col>
        </Row>
        <Row>
          <Col md="7">
            <ProductList
              productList={productList}
              putProductInItemList={p => this.putProductInItemList(p)}
            />
          </Col>
          <Col md="5">
            <ItemList itemList={itemList} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Store;
