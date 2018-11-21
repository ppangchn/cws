import React, { Component } from "react";
import {
  Table,
  Input,
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import "../../css/Store/ItemList.css";
import axios from "axios";
import config from "../../config";

class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      itemList: [],
      customerID: "",
      staffID: "",
      subtotal: 0,
      discount: 0,
      totalPrice: 0,
      isSent: false,
      firstName: "",
      lastName: "",
      balance: 0
    };
  }
  handleCustomerID(custID) {
    this.setState({ customerID: custID.target.value });
  }
  handleStaffID(staffID) {
    this.setState({ staffID: staffID.target.value });
  }
  toggleModal() {
    this.setState({ isSent: !this.state.isSent });
    window.location.reload(true);
  }
  async sentData() {
    const { itemList, customerID, staffID, totalPrice } = this.state;
    const data = {
      customerID: customerID,
      staffID: staffID,
      itemList: itemList,
      totalPrice: totalPrice
    };
    try {
      await axios.post(`${config.url}/makeTransaction`, data).then(res => {
        const { data } = res;
        const user = data.user[0]
        this.setState({
          firstName: user.Firstname,
          lastName: user.Lastname,
          balance: user.Balance,
          isSent: true
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentWillReceiveProps(props) {
    const { itemList } = props;
    let subtotal = 0;
    itemList.map(item => {
      subtotal += item.totalPrice;
    });
    console.log(itemList);
    this.setState({ itemList, subtotal, totalPrice: subtotal });
  }
  render() {
    const {
      itemList,
      customerID,
      staffID,
      subtotal,
      discount,
      totalPrice,
      isSent,
      firstName,
      lastName,
      balance
    } = this.state;
    return (
      <Container
        style={{ display: "flex", flexDirection: "column", fontSize: "1vw" }}
      >
        <Row>
          <Col style={{ fontSize: "1.5vw" }}>Item list</Col>
        </Row>
        <Row>
          <Col>
            <Table className="table-custom" responsive={true}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Total price</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.totalPrice}</td>
                      <td>{item.qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb">
          <Col>Customer ID</Col>
          <Col>
            <Input
              size="sm"
              value={customerID}
              onChange={e => this.handleCustomerID(e)}
            />
          </Col>
        </Row>
        <Row className="mb">
          <Col>Staff ID</Col>
          <Col>
            <Input
              size="sm"
              value={staffID}
              onChange={e => this.handleStaffID(e)}
            />
          </Col>
        </Row>
        <Row className="mb">
          <Col>Subtotal</Col>
          <Col style={{ textAlign: "center" }}>{subtotal}</Col>
        </Row>
        <Row className="mb">
          <Col>Discount</Col>
          <Col style={{ textAlign: "center" }}>{discount}</Col>
        </Row>
        <Row className="mb">
          <Col>Total price</Col>
          <Col style={{ textAlign: "center" }}>{totalPrice}</Col>
        </Row>
        <Row>
          <Col>
            <Button
              color="pink"
              style={{ marginBottom: "40px" }}
              onClick={() => this.sentData()}
              block
            >
              Confirm
            </Button>
          </Col>
        </Row>
        <Modal isOpen={isSent} centered={true}>
          <ModalHeader>:)</ModalHeader>
          <ModalBody>
            {`Thank you ${firstName} ${lastName} for your purchase. (From Staff ${staffID})\nYour balance is ${balance}`}
          </ModalBody>
          <ModalFooter>
            <Button color="pink" onClick={() => this.toggleModal()}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
export default ItemList;
