import React, { Component } from "react";
import { UncontrolledCarousel, Container, Row, Col } from "reactstrap";
import styled from "styled-components";
const items = [
  {
    src:
      "https://i0.wp.com/welovebudapest.com/en/wp-content/uploads/sites/2/2016/04/94a34a1670d88792c4400cfd7e236a7b.jpg?resize=1920%2C1080&ssl=1"
  },
  {
    src:
      "https://mediavideo.blastingnews.com/p/4/2018/02/19/9a21d511-6599-4bed-919b-a2403d0ea273.jpg"
  },
  {
    src:
      "https://www.vitra.com/en-us/_storage/asset/1617833/storage/v_parallax_1920x1080/29887117.jpg"
  }
];
const Title = styled.div`
  font-size: 5vw;
  top: 15vw;
  display: flex;
  width: 100%;
  position: absolute;
  justify-content: center;
  color: rgb(255, 51, 106);
`;
class Home extends Component {
  render() {
    return (
      <div>
        <UncontrolledCarousel pause="false" items={items} />
        <Title>CU COWORKING-SPACE</Title>
        <Container
          style={{
            color: "rgb(238,128,126)",
            textAlign: "center",
            marginTop: "50px"
          }}
        >
          <Row className="mb">
            <Col style={{ fontSize: "3vw" }}>A place to work together</Col>
          </Row>
          <Row className="mb" style={{ fontSize: "1.5vw" }}>
            <Col>About us</Col>
            <Col>Teamwork</Col>
            <Col>Privileges</Col>
          </Row>
          <Row className="mb">
            <Col>
              Meet your new working space where everything is possible. We’ve
              provide a variety of facilities and greatest service. Register
              your account now to get your privileges.
            </Col>
            <Col>
              Working with your team with our meeting rooms. Book now, and get
              works done!
            </Col>
            <Col>
              Enjoy discount for everything in our coworking space with
              privileges for customers. The more you spend, the more you get.
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
