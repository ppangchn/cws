import React, { Component } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";
import "../css/Register.css";

class Register extends Component {
  render() {
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
            <Button color="pink">Customer</Button>
          </Col>
          <Col>
            <Button color="pink">Staff</Button>
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
            <Input />
          </Col>
          <Col>
            <Input />
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
            <Input />
          </Col>
          <Col>
            <Input />
          </Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>Social security number</Col>
          <Col>Birthday</Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Input />
          </Col>
          <Col>
            <Input />
          </Col>
        </Row>
        <Row className="mb ml input-fs">
          <Col>Phone number</Col>
          <Col>Address</Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Input />
          </Col>
          <Col>
            <Input />
          </Col>
        </Row>
        <Row className="mb ml">
          <Col>4. Staff Information(For staff)</Col>
          <Col>
            <Button color="pink">Part time</Button>
          </Col>
          <Col>
            <Button color="pink">Full time</Button>
          </Col>
        </Row>
        <Row className="mb ml">
          <Col>
            <Button>Create Account</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
