import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import FacilitiesTime from "../Booking/FacilitiesTime";
import axios from "axios";
import config from "../../config";
import "../../css/Booking/Facilities.css";

class Facilities extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      customerID: "",
      reserveData: { id: -1, listTimeSlot: [] },
      selectedRoomid: -1,
      isSent: false
    };
  }
  handleCustomerID(customerID) {
    this.setState({ customerID });
  }
  handleSelectedTime(roomid, timeslotID) {
    let { reserveData } = this.state;
    if (reserveData.id !== roomid) {
      reserveData = {
        id: roomid,
        listTimeSlot: [timeslotID]
      };
    } else {
      let list = reserveData.listTimeSlot;
      const index = list.indexOf(timeslotID);
      if (index === -1) list.push(timeslotID);
      else list.splice(index, 1);
      reserveData = { id: roomid, listTimeSlot: list };
    }
    this.setState({ reserveData, selectedRoomid: roomid });
    console.log("reserveData", reserveData);
  }
  toggleModal() {
    this.setState({ isSent: !this.state.isSent });
    window.location.reload(true);
  }
  async sentData() {
    const { reserveData, customerID } = this.state;
    const { date } = this.props;
    const data = {
      meetingRoom_ID: reserveData.id,
      Date: date.format("YYYY-MM-DD"),
      timeslot: reserveData.listTimeSlot,
      customer_ID: customerID
    };
    try {
      await axios
        .post(`${config.url}/bookMeetingRoom`, data)
        .then(this.setState({ isSent: true }));
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }
  componentWillReceiveProps(props) {
    const { data } = props;
    this.setState({ data });
  }
  render() {
    const { data, customerID, selectedRoomid, isSent } = this.state;
    return (
      <Container
        style={{
          color: "rgb(238,128,126)",
          fontSize: "1.5vw"
        }}
      >
        <Row className="mb">
          <Col>3. Please select preferred room and duration</Col>
        </Row>
        {data.map((e, i) => {
          return (
            <Row className="mb" key={i}>
              <Col md="3">
                <Button color="room-pink" style={{ cursor: "default" }}>
                  {e.name}
                </Button>
              </Col>
              <Col className="time-slider">
                {e.timeslot.map(t => {
                  return (
                    <FacilitiesTime
                      selectedRoomid={selectedRoomid}
                      roomid={e.id}
                      id={t[0]}
                      startTime={t[1]}
                      endTime={t[2]}
                      handleSelectedTime={(roomid, timeslotID) =>
                        this.handleSelectedTime(roomid, timeslotID)
                      }
                    />
                  );
                })}
              </Col>
            </Row>
          );
        })}
        <Row style={{ textAlign: "center" }} className="input-fs mb">
          <Col md="2">Customer ID : </Col>
          <Col>
            <Input
              value={customerID}
              onChange={e => this.handleCustomerID(e.target.value)}
            />
          </Col>
          <Col>
            <Button color="pink" onClick={() => this.sentData()}>
              Confirm
            </Button>
          </Col>
        </Row>
        <Modal isOpen={isSent} centered={true}>
          <ModalHeader>:)</ModalHeader>
          <ModalBody>Booking Complete!</ModalBody>
          <ModalFooter>
            <Button color="pink" onClick={() => this.toggleModal()}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Facilities;
