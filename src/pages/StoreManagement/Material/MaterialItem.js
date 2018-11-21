import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  Input
} from "reactstrap";
import axios from "axios";
import config from "../../../config";

class MaterialItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpenEdit: false,
      isOpenDelete: false,
      name: "",
      price: 0,
      remainingPiece: 0
    };
  }
  handleName(name) {
    this.setState({ name });
  }
  handlePrice(price) {
    this.setState({ price });
  }
  handleRemainingPiece(remainingPiece) {
    this.setState({ remainingPiece });
  }
  toggleModalEdit() {
    this.setState({ isOpenEdit: !this.state.isOpenEdit });
  }
  toggleModalDelete() {
    this.setState({ isOpenDelete: !this.state.isOpenDelete });
  }
  async sentData() {
    try {
      const { id, name, price, remainingPiece } = this.state;
      const data = {
        Material_ID: id,
        Name: name,
        Price: price,
        RemainingPiece: remainingPiece
      };
      await axios
        .post(`${config.url}/updateMaterial`, data)
        .then(this.setState({ isOpen: false }))
    } catch (error) {
      console.log(error);
    }
    this.props.getData()
  }
  async delete() {
    try {
      const { id } = this.state;
      const data = {
        Material_ID: id
      };
      await axios
        .post(`${config.url}/deleteMaterial`, data)
        .then(this.setState({ isOpenDelete: false }));
    } catch (error) {
      console.log(error);
    }
    this.props.getData()
  }
  componentDidMount() {
    const { item } = this.props;
    this.setState({
      id: item.Material_ID,
      name: item.Name,
      price: item.Price,
      remainingPiece: item.RemainingPiece
    });
  }
  render() {
    const {
      isOpenEdit,
      isOpenDelete,
      id,
      name,
      price,
      remainingPiece
    } = this.state;
    return (
      <tr>
        <th>{id}</th>
        <th>{name}</th>
        <th>{price}</th>
        <th>{remainingPiece}</th>
        <Button
          size="sm"
          onClick={() => this.toggleModalEdit()}
          color="edit"
          className="mt-sm"
        >
          Edit
        </Button>
        <Button
          size="sm"
          color="danger"
          className="mt-sm"
          onClick={() => this.toggleModalDelete()}
        >
          Delete
        </Button>
        <Modal
          centered
          isOpen={isOpenEdit}
          style={{ color: "rgb(238,128,126)" }}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleModalEdit()}>
            Edit Material
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>Price</Col>
                <Col>Remaining in piece</Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    value={name}
                    onChange={e => this.handleName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    value={price}
                    onChange={e => this.handlePrice(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    value={remainingPiece}
                    onChange={e => this.handleRemainingPiece(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.toggleModalEdit()}>
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleModalEdit();
                this.sentData();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={isOpenDelete} centered={true}>
          <ModalHeader>:)</ModalHeader>
          <ModalBody>{`Are you sure you want to delete "${name}"`}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.toggleModalDelete()}>
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleModalDelete();
                this.delete();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </tr>
    );
  }
}

export default MaterialItem;
