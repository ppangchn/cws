import React, { Component } from "react";
import { Col, Button } from "reactstrap";

class FacilitiesTime extends Component {
  constructor() {
    super();
    this.state = { startTime: "", endTime: "", color: "pink" };
  }
  chooseTime() {
    const { id, handleSelectedTime, roomid } = this.props;
    const { color } = this.state;
    handleSelectedTime(roomid, id);
    if (color === "pink") {
      this.setState({ color: "pinknh" });
    } else {
      this.setState({ color: "pink" });
    }
  }
  clear() {
    this.setState({ color: "pink" });
  }
  componentDidMount() {
    const { startTime, endTime } = this.props;
    this.setState({ startTime, endTime });
  }
  componentWillReceiveProps(props) {
    const { startTime, endTime, selectedRoomid, roomid } = props;
    if (selectedRoomid !== roomid) this.clear();
    this.setState({ startTime, endTime });
  }
  render() {
    const { startTime, endTime, color } = this.state;
    return (
      <Button
        color={color}
        onClick={() => this.chooseTime()}
      >{`${startTime}-${endTime}`}</Button>
    );
  }
}

export default FacilitiesTime;
