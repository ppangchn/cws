import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input
} from "reactstrap";
import axios from "axios";
import config from "../../config";
import Instant from "./Instant/Instant";
import CountIngredient from "./CountIngredient/CountIngredient";
import UncountIngredient from "./UncountIngredient/UncountIngredient";
import Material from "./Material/Material";
import CreatableSelect from "react-select/lib/Creatable";

class StoreManagement extends Component {
  constructor() {
    super();
    this.state = {
      isAddInstantProduct: false,
      isAddCountIngredient: false,
      isAddUnCountIngredient: false,
      isAddMaterial: false,
      instantProductName: "",
      instantProductPrice: "",
      instantProductRemaining: "",
      countIngredientName: "",
      countIngredientPrice: "",
      countIngredientRemaining: "",
      uncountIngredientName: "",
      uncountIngredientPrice: "",
      uncountIngredientRemaining: "",
      materialName: "",
      materialPrice: "",
      materialRemainingPiece: "",
      instant: [],
      countIngredient: [],
      uncountIngredient: [],
      material: [],
      category: [],
      company: [],
      selectedCategory: "",
      selectedCompany: "",
      newCategory: ""
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
  handleInstantProductName(instantProductName) {
    this.setState({ instantProductName });
  }
  handleInstantProductPrice(instantProductPrice) {
    this.setState({ instantProductPrice });
  }
  handleInstantProductRemaining(instantProductRemaining) {
    this.setState({ instantProductRemaining });
  }
  handleCountIngredientName(countIngredientName) {
    this.setState({ countIngredientName });
  }
  handleCountIngredientPrice(countIngredientPrice) {
    this.setState({ countIngredientPrice });
  }
  handleCountIngredientRemaining(countIngredientRemaining) {
    this.setState({ countIngredientRemaining });
  }
  handleUncountIngredientName(uncountIngredientName) {
    this.setState({ uncountIngredientName });
  }
  handleUncountIngredientPrice(uncountIngredientPrice) {
    this.setState({ uncountIngredientPrice });
  }
  handleUncountIngredientRemaining(uncountIngredientRemaining) {
    this.setState({ uncountIngredientRemaining });
  }
  handleMaterialName(materialName) {
    this.setState({ materialName });
  }
  handleMaterialPrice(materialPrice) {
    this.setState({ materialPrice });
  }
  handleMaterialRemaining(materialRemaining) {
    this.setState({ materialRemaining });
  }
  toggleAddInstantProductModal() {
    this.setState({ isAddInstantProduct: !this.state.isAddInstantProduct });
  }
  toggleAddCountIngredientModal() {
    this.setState({
      isAddCountIngredient: !this.state.isAddCountIngredient
    });
  }
  toggleAddUnCountIngredientModal() {
    this.setState({
      isAddUnCountIngredient: !this.state.isAddUnCountIngredient
    });
  }
  toggleAddMaterialModal() {
    this.setState({ isAddMaterial: !this.state.isAddMaterial });
  }
  async addInstantProduct() {
    try {
      const {
        instantProductName,
        instantProductPrice,
        instantProductRemaining,
        selectedCategory,
        selectedCompany
      } = this.state;
      console.log("pangnaruk", selectedCategory, selectedCompany);
      const data = {
        Name: instantProductName,
        Price: instantProductPrice,
        RemainingPiece: instantProductRemaining,
        Type: "Instant",
        Category_ID: selectedCategory.value.Category_ID,
        Company_ID: selectedCompany.value.Company_ID,
        categoryName: selectedCategory.value.CatName,
        companyName: selectedCompany.value.ComName
      };
      console.log("data", data);
      await axios.post(`${config.url}/addInstant`, data);
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }
  async addCountIngredient() {
    try {
      const {
        countIngredientName,
        countIngredientPrice,
        countIngredientRemaining
      } = this.state;
      const data = {
        Name: countIngredientName,
        Type: "Countable",
        PricePerPiece: countIngredientPrice,
        RemainingPiece: countIngredientRemaining
      };
      await axios.post(`${config.url}/addIngredient`, data);
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }
  async addUncountIngredient() {
    try {
      const {
        uncountIngredientName,
        uncountIngredientPrice,
        uncountIngredientRemaining
      } = this.state;
      const data = {
        Name: uncountIngredientName,
        Type: "Uncountable",
        PricePerKG: uncountIngredientPrice,
        RemainingInKG: uncountIngredientRemaining
      };
      await axios.post(`${config.url}/addIngredient`, data);
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }
  async addMaterial() {
    try {
      const { materialName, materialPrice, materialRemaining } = this.state;
      const data = {
        Name: materialName,
        Price: materialPrice,
        RemainingPiece: materialRemaining
      };
      await axios.post(`${config.url}/addMaterial`, data);
    } catch (error) {
      console.log(error);
    }
    this.getData();
  }
  async getData() {
    try {
      this.clear();
      console.log("getdata!!!");
      await axios.get(`${config.url}/getStore`).then(res => {
        const { data } = res;
        console.log(data);
        this.setState({
          instant: data.instant,
          countIngredient: data.count,
          uncountIngredient: data.uncount,
          material: data.material
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getCategoryAndCompany() {
    try {
      await axios.get(`${config.url}/getCategory`).then(res => {
        const { data } = res;
        const category = data.rows.map(d => {
          return { value: d, label: d.CatName };
        });
        this.setState({ category });
      });
    } catch (error) {
      console.log(error);
    }
    try {
      await axios.get(`${config.url}/getCompany`).then(res => {
        const { data } = res;
        const company = data.rows.map(d => {
          return { value: d, label: d.ComName };
        });
        console.log(company);
        this.setState({ company });
      });
    } catch (error) {
      console.log(error);
    }
  }
  clear() {
    this.setState({
      instantProductName: "",
      instantProductPrice: "",
      instantProductRemaining: "",
      countIngredientName: "",
      countIngredientPrice: "",
      countIngredientRemaining: "",
      uncountIngredientName: "",
      uncountIngredientPrice: "",
      uncountIngredientRemaining: "",
      materialName: "",
      materialPrice: "",
      materialRemainingPiece: ""
    });
  }
  componentDidMount() {
    this.getData();
    this.getCategoryAndCompany();
  }
  render() {
    const {
      isAddInstantProduct,
      isAddCountIngredient,
      isAddUnCountIngredient,
      isAddMaterial,
      instantProductName,
      instantProductPrice,
      instantProductRemaining,
      countIngredientName,
      countIngredientPrice,
      countIngredientRemaining,
      uncountIngredientName,
      uncountIngredientPrice,
      uncountIngredientRemaining,
      materialName,
      materialPrice,
      materialRemaining,
      instant,
      countIngredient,
      uncountIngredient,
      material,
      category,
      company,
      selectedCategory,
      selectedCompany,
      newCategory
    } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row>
          <Col style={{ fontSize: "2vw" }}>Store management</Col>
        </Row>
        <Row>
          <Col style={{ fontSize: "1.5vw", alignSelf: "center" }}>
            Instant Product
          </Col>
          <Col className="mb" style={{ textAlign: "end" }}>
            <Button
              color="pink"
              onClick={() => this.toggleAddInstantProductModal()}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row className="mb">
          <Col>
            <Table className="table-custom" responsive>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Remaining piece</th>
                </tr>
              </thead>
              <Instant instant={instant} getData={() => this.getData()} company={company} category={category} />
            </Table>
          </Col>
        </Row>
        <Row>
          <Col style={{ fontSize: "1.5vw", alignSelf: "center" }}>
            Ingredient - Countable
          </Col>
          <Col className="mb" style={{ textAlign: "end" }}>
            <Button
              color="pink"
              onClick={() => this.toggleAddCountIngredientModal()}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row className="mb">
          <Col>
            <Table className="table-custom" responsive>
              <thead>
                <tr>
                  <th>Ingredient ID</th>
                  <th>Name</th>
                  <th>Price per piece</th>
                  <th>Remaining in piece</th>
                </tr>
              </thead>
              <CountIngredient
                countIngredient={countIngredient}
                getData={() => this.getData()}
              />
            </Table>
          </Col>
        </Row>
        <Row>
          <Col style={{ fontSize: "1.5vw", alignSelf: "center" }}>
            Ingredient - Uncountable
          </Col>
          <Col className="mb" style={{ textAlign: "end" }}>
            <Button
              color="pink"
              onClick={() => this.toggleAddUnCountIngredientModal()}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row className="mb">
          <Col>
            <Table className="table-custom" responsive>
              <thead>
                <tr>
                  <th>Ingredient ID</th>
                  <th>Name</th>
                  <th>Price per kg</th>
                  <th>Remaining in kg</th>
                </tr>
              </thead>
              <UncountIngredient
                uncountIngredient={uncountIngredient}
                getData={() => this.getData()}
              />
            </Table>
          </Col>
        </Row>
        <Row>
          <Col style={{ fontSize: "1.5vw", alignSelf: "center" }}>Material</Col>
          <Col className="mb" style={{ textAlign: "end" }}>
            <Button color="pink" onClick={() => this.toggleAddMaterialModal()}>
              Add
            </Button>
          </Col>
        </Row>
        <Row className="mb">
          <Col>
            <Table className="table-custom" responsive>
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Remaining in piece</th>
                </tr>
              </thead>
              <Material material={material} getData={() => this.getData()} />
            </Table>
          </Col>
        </Row>
        <Modal
          centered
          isOpen={isAddInstantProduct}
          style={{ color: "rgb(238,128,126)" }}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>Adding Instant Product</ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>Price</Col>
                <Col>Remaining piece</Col>
                <Col>Category</Col>
                <Col>Company</Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    value={instantProductName}
                    onChange={e =>
                      this.handleInstantProductName(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={instantProductPrice}
                    onChange={e =>
                      this.handleInstantProductPrice(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={instantProductRemaining}
                    onChange={e =>
                      this.handleInstantProductRemaining(e.target.value)
                    }
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
            <Button
              color="danger"
              onClick={() => this.toggleAddInstantProductModal()}
            >
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleAddInstantProductModal();
                this.addInstantProduct();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          centered
          isOpen={isAddCountIngredient}
          style={{ color: "rgb(238,128,126)" }}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}>
            Adding Ingredient - Countable
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>Remaining in piece</Col>
                <Col>Price per piece</Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    value={countIngredientName}
                    onChange={e =>
                      this.handleCountIngredientName(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={countIngredientPrice}
                    onChange={e =>
                      this.handleCountIngredientPrice(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={countIngredientRemaining}
                    onChange={e =>
                      this.handleCountIngredientRemaining(e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.toggleAddCountIngredientModal()}
            >
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleAddCountIngredientModal();
                this.addCountIngredient();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          centered
          isOpen={isAddUnCountIngredient}
          style={{ color: "rgb(238,128,126)" }}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleAddUnCountIngredientModal()}>
            Adding Ingredient - Uncountable
          </ModalHeader>
          <ModalBody>
            <Container>
              <Row>
                <Col>Name</Col>
                <Col>Remaining in kg</Col>
                <Col>Price per kg</Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    value={uncountIngredientName}
                    onChange={e =>
                      this.handleUncountIngredientName(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={uncountIngredientPrice}
                    onChange={e =>
                      this.handleUncountIngredientPrice(e.target.value)
                    }
                  />
                </Col>
                <Col>
                  <Input
                    value={uncountIngredientRemaining}
                    onChange={e =>
                      this.handleUncountIngredientRemaining(e.target.value)
                    }
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.toggleAddUnCountIngredientModal()}
            >
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleAddUnCountIngredientModal();
                this.addUncountIngredient();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          centered
          isOpen={isAddMaterial}
          style={{ color: "rgb(238,128,126)" }}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleAddMaterialModal()}>
            Adding Material
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
                    value={materialName}
                    onChange={e => this.handleMaterialName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    value={materialPrice}
                    onChange={e => this.handleMaterialPrice(e.target.value)}
                  />
                </Col>
                <Col>
                  <Input
                    value={materialRemaining}
                    onChange={e => this.handleMaterialRemaining(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.toggleAddMaterialModal()}
            >
              Cancel
            </Button>{" "}
            <Button
              color="pink"
              onClick={() => {
                this.toggleAddMaterialModal();
                this.addMaterial();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default StoreManagement;
