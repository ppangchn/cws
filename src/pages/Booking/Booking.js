import React, { Component } from "react";
import { Container, Row, Col, Button, Table } from "reactstrap";
import axios from "axios";
import config from "../../config";
import "../../css/Booking/Booking.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import Facilities from '../Booking/Facilities'

class Booking extends Component {
  constructor() {
    super();
    this.state = {
      meetingroomButtonColor: "pink",
      lockerButtonColor: "pinkdisable",
      mediaButtonColor: "pinkdisable",
      sizeSButtonColor: "pink",
      sizeMButtonColor: "pink",
      sizeLButtonColor: "pink",
      facility: "",
      size: [],
      chooseMeetingroom: false,
      selectedDate: moment(new Date()),
      isGetData: false,
      data:[]
    };
  }
  changeMeetingroomButton() {
    this.setState({
      meetingroomButtonColor: "pinknh",
      facility: "Meeting Room",
      chooseMeetingroom: true
    });
  }

  changeSizeSButton() {
    const { sizeSButtonColor, size } = this.state;
    if (sizeSButtonColor === "pinknh") {
      const i = size.indexOf("S");
      if (i !== -1) {
        size.splice(i, 1);
        this.setState({ sizeSButtonColor: "pink", size });
      }
    } else {
      size.push("S");
      this.setState({
        sizeSButtonColor: "pinknh",
        size
      });
    }
  }
  changeSizeMButton() {
    const { sizeMButtonColor, size } = this.state;
    if (sizeMButtonColor === "pinknh") {
      const i = size.indexOf("M");
      if (i !== -1) {
        size.splice(i, 1);
        this.setState({ sizeMButtonColor: "pink", size });
      }
    } else {
      size.push("M");
      this.setState({
        sizeMButtonColor: "pinknh",
        size
      });
    }
  }
  changeSizeLButton() {
    const { sizeLButtonColor, size } = this.state;
    if (sizeLButtonColor === "pinknh") {
      const i = size.indexOf("L");
      if (i !== -1) {
        size.splice(i, 1);
        this.setState({ sizeLButtonColor: "pink", size });
      }
    } else {
      size.push("L");
      this.setState({
        sizeLButtonColor: "pinknh",
        size
      });
    }
  }
  handleChangeDatePicker(date) {
    console.log(date)
    this.setState({
      selectedDate: date
    });
  }
  async getData() {
    const { size, facility, selectedDate } = this.state;
    console.log('selectdate',selectedDate)
    const data = {
      date: selectedDate.format("YYYY-MM-DD")
    };
    if (facility === "Meeting Room") {
      try {
        await axios.post(`${config.url}/getMeetingRoom`, data).then(res => {
          const { data } = res;
          console.log(data)
          const filterData = data.meetingRoom.filter(e => {
            return size.indexOf(e.size) !== -1
          });
          console.log(filterData)
          this.setState({ data: filterData, isGetData: true });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  render() {
    const {
      meetingroomButtonColor,
      lockerButtonColor,
      mediaButtonColor,
      sizeSButtonColor,
      sizeMButtonColor,
      sizeLButtonColor,
      chooseMeetingroom,
      selectedDate,
      isGetData,
      data
    } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          marginTop: "80px",
          fontSize: "1.5vw"
        }}
      >
        <Row className="mb ml">
          <Col style={{ fontSize: "2vw" }}>Book our facilities</Col>
        </Row>
        <Row className="mb ml" style={{ textAlign: "center" }}>
          <Col>
            <Button
              color={meetingroomButtonColor}
              onClick={() => this.changeMeetingroomButton()}
            >
              Meeting room
            </Button>
          </Col>
          <Col>
            <Button
              color={lockerButtonColor}
              disabled
              //   onClick={() => this.changeLockerButton()}
            >
              Locker
            </Button>
          </Col>
          <Col>
            <Button
              color={mediaButtonColor}
              disabled
              //   onClick={() => this.changeMediaButton()}
            >
              Media
            </Button>
          </Col>
        </Row>
        {chooseMeetingroom && (
          <Container style={{ padding: "0" }}>
            <Row className="mb ml">
              <Col>1. Please select meeting room size</Col>
            </Row>
            <Row className="mb ml" style={{ textAlign: "center" }}>
              <Col>
                <Button
                  color={sizeSButtonColor}
                  onClick={() => {
                    this.changeSizeSButton();
                  }}
                >
                  S
                </Button>
              </Col>
              <Col>
                <Button
                  color={sizeMButtonColor}
                  onClick={() => {
                    this.changeSizeMButton();
                  }}
                >
                  M
                </Button>
              </Col>
              <Col>
                <Button
                  color={sizeLButtonColor}
                  onClick={() => {
                    this.changeSizeLButton();
                  }}
                >
                  L
                </Button>
              </Col>
            </Row>
            <Row className="mb ml">
              <Col>2. Please choose date</Col>
            </Row>
            <Row className="mb ml" style={{ textAlign: "center" }}>
              <Col>
                <DatePicker
                  calendarClassName="datepicker-calendar"
                  className="datepicker"
                  selected={selectedDate}
                  onChange={e => this.handleChangeDatePicker(e)}
                  showYearDropdown
                  dateFormat="DD MMM YYYY"
                  dateFormatCalendar="MMMM"
                  scrollableYearDropdown
                  yearDropdownItemNumber={15}
                />
              </Col>
              <Col>
                <Button
                  color="pink"
                  onClick={() => {
                    this.getData();
                  }}
                >
                  GO
                </Button>
              </Col>
              <Col />
            </Row>
            {isGetData && <Facilities data={data} date={selectedDate}/>}
          </Container>
        )}
      </Container>
    );
  }
}

export default Booking;
