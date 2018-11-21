import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import TotalSaleChart from "./TotalSaleChart";
import TotalProductSaleChart from "./TotalProductSaleChart";

class Analytics extends Component {
  render() {
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row className="mb">
          <Col>
            <TotalSaleChart />
          </Col>
        </Row>
        <Row className="mb">
          <Col>
            <TotalProductSaleChart />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Analytics;
