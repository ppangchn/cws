import React, { Component } from "react";
import { Navbar, Nav, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import "../css/Header.css";

const Home = styled.div`
  cursor: pointer;
`;
const Register = styled.div`
  cursor: pointer;
`;
const Booking = styled.div`
  cursor: pointer;
`;
const MyBooking = styled.div`
  cursor: pointer;
`;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      homebold: "bold",
      registerbold: "",
      bookingbold: "",
      mybookingbold: ""
    };
  }
  changeHomeTitle() {
    this.clear();
    this.setState({ homebold: "bold" });
    this.props.history.push("/");
  }
  changeRegisterTitle() {
    this.clear();
    this.setState({ registerbold: "bold" });
    this.props.history.push("/register");
  }
  changeBookingTitle() {
    this.clear();
    this.setState({ bookingbold: "bold" });
  }
  changeMyBookingTitle() {
    this.clear();
    this.setState({ mybookingbold: "bold" });
  }
  updatePath() {
    this.clear();
    const path = window.location.pathname;
    if (path == "/") this.changeHomeTitle();
    else if (path == "/register") this.changeRegisterTitle();
  }
  clear() {
    this.setState({
      homebold: "",
      registerbold: "",
      bookingbold: "",
      mybookingbold: ""
    });
  }
  componentDidMount() {
    this.updatePath();
  }
  render() {
    const { homebold, registerbold, bookingbold, mybookingbold } = this.state;
    return (
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "rgb(238,128,126)",
          color: "white",
          fontSize: '1.2vw'
        }}
      >
        <Nav>
          <NavLink onClick={() => this.changeHomeTitle()}>
            <Home
              className={
                homebold == "bold" ? `${homebold}` : `underline ${homebold}`
              }
            >
              Home
            </Home>
          </NavLink>
          <NavLink onClick={() => this.changeRegisterTitle()}>
            <Register className={`underline ${registerbold}`}>
              Register
            </Register>
          </NavLink>
          <NavLink onClick={() => this.changeBookingTitle()}>
            <Booking className={`underline ${bookingbold}`}>Booking</Booking>
          </NavLink>
          <NavLink onClick={() => this.changeMyBookingTitle()}>
            <MyBooking className={`underline ${mybookingbold}`}>
              My Booking
            </MyBooking>
          </NavLink>
          <NavLink>
            <div style={{ cursor: "default" }}>Store(coming soon..)</div>
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
