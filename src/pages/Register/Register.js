import React, { Component } from "react";
import { Container, Row, Col, Button, Input,Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap";
import config from "../../config";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../../css/Register.css"
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      roleType: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      ssn: "",
      dob: "",
      phonenumber: "",
      address: "",
      customerButtonColor: "pink",
      staffButtonColor: "pink",
      partTimeButtonColor: "pink",
      fullTimeButtonColor: "pink",
      isCreated:false
    };
  }
  handleChangeDatePicker(date) {
    this.setState({
      dob : date
    });
  }
  changeCustomerButton() {
    this.setState({
      customerButtonColor: "pinknh",
      staffButtonColor: "pink",
      roleType: "Customer"
    });
  }
  changeStaffButton() {
    this.setState({
      staffButtonColor: "pinknh",
      customerButtonColor: "pink",
      roleType: "Staff"
    });
  }
  changePartTimeButton() {
    this.setState({
      partTimeButtonColor: "pinknh",
      fullTimeButtonColor: "pink",
      staffType: "Part time"
    });
  }
  changeFullTimeButton() {
    this.setState({
      fullTimeButtonColor: "pinknh",
      partTimeButtonColor: "pink",
      staffType: "Full time"
    });
  }
  handleEmail(email) {
    this.setState({ email });
  }
  handlePassword(password) {
    this.setState({ password });
  }
  handleFirstName(firstname) {
    this.setState({ firstname });
  }
  handleLastName(lastname) {
    this.setState({ lastname });
  }
  handleSSN(ssn) {
    this.setState({ ssn });
  }
  handleBirthday(dob) {
    this.setState({ dob });
  }
  handlePhoneNumber(phonenumber) {
    this.setState({ phonenumber });
  }
  handleAddress(address) {
    this.setState({ address });
  }
  toggleModal() {
    this.setState({isCreated : !this.state.isCreated})
  }
  async sentData() {
    const {
      roleType,
      email,
      password,
      firstname,
      lastname,
      ssn,
      dob,
      phonenumber,
      address,
      staffType
    } = this.state;
    const data = {
      roleType: roleType,
      email: email,
      password: password,
      firstName: firstname,
      lastName: lastname,
      securityNumber: ssn,
      phoneNumber: phonenumber,
      birthDay: new Date(dob),
      address: address,
      staffType: staffType
    };
    console.log("data", data, config.url);
    await axios.post(`${config.url}/registration`, data).then(res => {
      this.setState({isCreated:true})
    })
  }
  render() {
    const {
      email,
      password,
      firstname,
      lastname,
      ssn,
      phonenumber,
      address,
      customerButtonColor,
      staffButtonColor,
      partTimeButtonColor,
      fullTimeButtonColor,
      dob,
      isCreated
    } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row style={{ marginBottom: "20px" }}>
          <Col style={{ fontSize: "2vw" }}>Register an account</Col>
        </Row>
        <Row className="mb ml">
          <Col>1. Choose your role type</Col>
          <Col>
            <Button
              color={customerButtonColor}
              onClick={() => {
                this.changeCustomerButton();
              }}
            >
              Customer
            </Button>
          </Col>
          <Col>
            <Button
              color={staffButtonColor}
              onClick={() => {
                this.changeStaffButton();
              }}
            >
              Staff
            </Button>
          </Col>
        </Row>
        <Row className="mb ml">
          <Col>2. Username and password</Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>Email</Col>
          <Col>Password</Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Input
              className="input-placeholder register-input"
              type="email"
              placeholder="example@hotmail.com"
              value={email}
              onChange={e => this.handleEmail(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              type="password"
              value={password}
              onChange={e => this.handlePassword(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb ml">
          <Col>3. Basic Information</Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>First name</Col>
          <Col>Last name</Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Input
              value={firstname}
              onChange={e => this.handleFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              value={lastname}
              onChange={e => this.handleLastName(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>Social security number</Col>
          <Col>Birthday</Col>
        </Row>
        <Row className="mb ml">
          <Col md="6">
            <Input value={ssn} onChange={e => this.handleSSN(e.target.value)} />
          </Col>
          <Col>
            <DatePicker
            calendarClassName="datepicker-calendar"
              className="datepicker"
              placeholderText={moment().format('DD MMM YYYY')}
              selected={dob}
              onChange={e => this.handleChangeDatePicker(e)}
              showYearDropdown
              dateFormat="DD MMM YYYY"
              dateFormatCalendar="MMMM"
              scrollableYearDropdown
              yearDropdownItemNumber={15}
            />
          </Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>Phone number</Col>
          <Col>Address</Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Input
              value={phonenumber}
              onChange={e => this.handlePhoneNumber(e.target.value)}
            />
          </Col>
          <Col>
            <Input
              value={address}
              onChange={e => this.handleAddress(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="ml" style={{ marginBottom: "50px" }}>
          <Col>4. Staff Information(For staff)</Col>
          <Col>
            <Button
              color={partTimeButtonColor}
              onClick={() => this.changePartTimeButton()}
            >
              Part time
            </Button>
          </Col>
          <Col>
            <Button
              color={fullTimeButtonColor}
              onClick={() => this.changeFullTimeButton()}
            >
              Full time
            </Button>
          </Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Button color="pink" onClick={() => this.sentData()}>
              Create Account
            </Button>
          </Col>
        </Row>
        <Modal isOpen={isCreated} centered={true}>
          <ModalHeader>:)</ModalHeader>
          <ModalBody>
              Complete registration, Thank you.
          </ModalBody>
          <ModalFooter>
            <Button color="pink" onClick={() => this.toggleModal()}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Register;
