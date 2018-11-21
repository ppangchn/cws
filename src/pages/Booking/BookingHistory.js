import React, { Component } from "react";
import { Table, Container, Row, Col, Input, Button } from "reactstrap";
import "../../css/Booking/BookingHistory.css";

class BookingHistory extends Component {
  constructor() {
    super();
    this.state = { isValid: true };
  }
  render() {
    const { isValid } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row className="mb ml">
          <Col style={{ fontSize: "2vw" }}>Booking history</Col>
        </Row>
        <Row className="mb ml">
          <Col md="2" style={{ textAlign: "center" }}>
            Email:{" "}
          </Col>
          <Col>
            <Input />
          </Col>
          <Col md="2" style={{ textAlign: "center" }}>
            Password:{" "}
          </Col>
          <Col>
            <Input type="password" />
          </Col>
          <Col>
            <Button color="pink">Go</Button>
          </Col>
        </Row>
        {isValid && (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        )}
      </Container>
    );
  }
}

export default BookingHistory;
