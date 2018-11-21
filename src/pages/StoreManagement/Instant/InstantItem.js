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
import CreatableSelect from "react-select/lib/Creatable";
import "../../../css/StoreManagement/InstantItem.css";

class InstantItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpenEdit: false,
      isOpenDelete: false,
      name: "",
      selectedCategory: "",
      selectedCompany: "",
      company: [],
      category: [],
      price: 0,
      remainingPiece: 0
    };
  }
  handleIsValidNewOptionCategory() {
    return true;
  }
  handleIsValidNewOptionCompany() {
    return true;
  }
  handleFormatCategory(inputValue) {
    return 'Create.. "' + inputValue + '"';
  }
  handleFormatCompany(inputValue) {
    return 'Create.. "' + inputValue + '"';
  }
  handleNewCategory(selectedCategory) {
    // console.log("handleNewCategory", selectedCategory);
  }
  handleNewCompany(selectedCompany) {
    // console.log("handleNewCompany", selectedCompany);
  }
  handleChangeCategory(selectedCategory) {
    const { category } = this.state;
    const tmpselectedCategory = {
      value: {
        Category_ID: -1,
        Description: "",
        Name: selectedCategory.value
      },
      label: selectedCategory.label
    };
    category.push(selectedCategory);
    this.setState({ category, selectedCategory: tmpselectedCategory });
  }
  handleChangeCompany(selectedCompany) {
    const { company } = this.state;
    const tmpselectedCompany = {
      value: {
        Company_ID: -1,
        Description: "",
        Name: selectedCompany.value
      },
      label: selectedCompany.label
    };
    company.push(tmpselectedCompany);
    this.setState({ company, selectedCompany: tmpselectedCompany });
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
      const {
        id,
        name,
        price,
        remainingPiece,
        selectedCategory,
        selectedCompany
      } = this.state;
      console.log(selectedCategory,selectedCompany)
      const data = {
        Product_ID: id,
        Name: name,
        Price: price,
        RemainingPiece: remainingPiece,
        Type: "Instant",
        Category_ID: selectedCategory.value.Category_ID,
        Company_ID: selectedCompany.value.Company_ID,
        categoryName: selectedCategory.value.Name.CatName,
        companyName: selectedCompany.value.Name.ComName
      };
      console.log("data", data);
      await axios
        .post(`${config.url}/updateInstant`, data)
        .then(this.setState({ isOpen: false }));
    } catch (error) {
      console.log(error);
    }
    this.props.getData();
  }
  async delete() {
    try {
      const { id } = this.state;
      const data = {
        Product_ID: id
      };
      await axios
        .post(`${config.url}/deleteInstant`, data)
        .then(this.setState({ isOpenDelete: false }));
    } catch (error) {
      console.log(error);
    }
    this.props.getData();
  }
  componentWillReceiveProps(props) {
    const { item, category, company } = props;
    const selectedCategory = {
      value: {
        Category_ID: item.Category_ID,
        Description: "",
        Name: item.CatName
      },
      label: item.CatName
    };
    const selectedCompany = {
      value: {
        Company_ID: item.Company_ID,
        Description: "",
        Name: item.ComName
      },
      label: item.ComName
    };
    this.setState({
      id: item.Product_ID,
      name: item.Name,
      price: item.Price,
      remainingPiece: item.RemainingPiece,
      selectedCategory,
      selectedCompany,
      category,
      company,
    });
  }
  render() {
    const {
      id,
      name,
      price,
      category,
      company,
      remainingPiece,
      isOpenEdit,
      isOpenDelete,
      selectedCategory,
      selectedCompany
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
            Edit Instant
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>Price</Col>
                <Col>Remaining in piece</Col>
                <Col>Category</Col>
                <Col>Company</Col>
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
                <Col>
                  <CreatableSelect
                    formatCreateLabel={e => this.handleFormatCategory(e)}
                    isValidNewOption={() =>
                      this.handleIsValidNewOptionCategory()
                    }
                    options={category}
                    value={selectedCategory}
                    onChange={e => this.handleChangeCategory(e)}
                    onInputChange={e => this.handleNewCategory(e)}
                  />
                </Col>
                <Col>
                  <CreatableSelect
                    formatCreateLabel={e => this.handleFormatCompany(e)}
                    isValidNewOption={() =>
                      this.handleIsValidNewOptionCompany()
                    }
                    options={company}
                    value={selectedCompany}
                    onChange={e => this.handleChangeCompany(e)}
                    onInputChange={e => this.handleNewCompany(e)}
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

export default InstantItem;
