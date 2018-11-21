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

class CountIngredientItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpenEdit: false,
      isOpenDelete: false,
      id: "",
      name: "",
      pricePerKG: 0,
      remainingInKG: 0
    };
  }
  handleName(name) {
    this.setState({ name });
  }
  handlePrice(pricePerPiece) {
    this.setState({ pricePerPiece });
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
      const { id, name, pricePerPiece, remainingPiece } = this.state;
      const data = {
        Ingredient_ID: id,
        Name: name,
        PricePerPiece: pricePerPiece,
        RemainingPiece: remainingPiece
      };
      await axios
        .post(`${config.url}/updateCount`, data)
        .then(this.setState({ isOpenEdit: false }));
    } catch (error) {
      console.log(error);
    }
    this.props.getData();
  }
  async delete() {
    try {
      const { id } = this.state;
      const data = {
        Ingredient_ID: id
      };
      await axios
        .post(`${config.url}/deleteCount`, data)
        .then(this.setState({ isOpenDelete: false }));
    } catch (error) {
      console.log(error);
    }
    this.props.getData();
  }
  componentDidMount() {
    const { item } = this.props;
    this.setState({
      id: item.Ingredient_ID,
      name: item.Name,
      pricePerPiece: item.PricePerPiece,
      remainingPiece: item.RemainingPiece
    });
  }
  render() {
    const {
      isOpenEdit,
      isOpenDelete,
      id,
      name,
      pricePerPiece,
      remainingPiece
    } = this.state;
    return (
      <tr>
        <th>{id}</th>
        <th>{name}</th>
        <th>{pricePerPiece}</th>
        <th>{remainingPiece}</th>
        <Button
          size="sm"
          color="edit"
          className="mt-sm"
          onClick={() => this.toggleModalEdit()}
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
                    value={pricePerPiece}
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

export default CountIngredientItem;
