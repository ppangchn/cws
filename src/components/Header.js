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
const Store = styled.div`
  cursor: pointer;
`;
const Analytics = styled.div`
  cursor: pointer;
`
class Header extends Component {
  constructor() {
    super();
    this.state = {
      homebold: "bold",
      registerbold: "",
      bookingbold: "",
      mybookingbold: "",
      storebold: "",
      storemanagementbold: "",
      analyticsbold:"",
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
    this.props.history.push("/booking");
  }
  changeMyBookingTitle() {
    this.clear();
    this.setState({ mybookingbold: "bold" });
    this.props.history.push("/bookinghistory");
  }
  changeStoreTitle() {
    this.clear();
    this.setState({ storebold: "bold" });
    this.props.history.push("/store");
  }
  changeStoreManagementTitle() {
    this.clear();
    this.setState({ storemanagementbold: "bold" });
    this.props.history.push("/storemangement");
  }
  changeAnalyticsTitle() {
    this.clear();
    this.setState({ analyticsbold: "bold" });
    this.props.history.push("/analytics");
  }
  updatePath() {
    this.clear();
    const path = window.location.pathname;
    if (path === "/") this.changeHomeTitle();
    else if (path === "/register") this.changeRegisterTitle();
    else if (path === "/booking") this.changeBookingTitle();
    else if (path === "/bookinghistory") this.changeMyBookingTitle();
    else if (path === "/store") this.changeStoreTitle();
    else if (path === "/storemangement") this.changeStoreManagementTitle();
    else if (path === "/analytics") this.changeAnalyticsTitle();
  }
  clear() {
    this.setState({
      homebold: "",
      registerbold: "",
      bookingbold: "",
      mybookingbold: "",
      storebold: "",
      storemanagementbold:"",
      analyticsbold: ""
    });
  }
  componentDidMount() {
    this.updatePath();
  }
  render() {
    const {
      homebold,
      registerbold,
      bookingbold,
      mybookingbold,
      storebold,
      storemanagementbold,
      analyticsbold
    } = this.state;
    return (
      <Navbar
        fixed="top"
        style={{
          backgroundColor: "rgb(238,128,126)",
          color: "white",
          fontSize: "1.2vw"
        }}
      >
        <Nav>
          <NavLink onClick={() => this.changeHomeTitle()}>
            <Home
              className={
                homebold === "bold" ? `${homebold}` : `underline ${homebold}`
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
          {/* <NavLink onClick={() => this.changeMyBookingTitle()}>
            <MyBooking className={`underline ${mybookingbold}`}>
              My Booking
            </MyBooking>
          </NavLink> */}
          <NavLink onClick={() => this.changeStoreTitle()}>
            <Store className={`underline ${storebold}`}>Store</Store>
          </NavLink>
          <NavLink onClick={() => this.changeStoreManagementTitle()}>
            <Store className={`underline ${storemanagementbold}`}>
              Store Management
            </Store>
          </NavLink>
          <NavLink onClick={() => this.changeAnalyticsTitle()}>
            <Analytics className={`underline ${analyticsbold}`}>
              Analytics
            </Analytics>
          </NavLink>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Header);
