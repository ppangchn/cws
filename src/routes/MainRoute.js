import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Booking from "../pages/Booking/Booking";
import BookingHistory from '../pages/Booking/BookingHistory'
import Store from '../pages/Store/Store'
import StoreManagement from '../pages/StoreManagement/StoreManagement'
import Analytics from '../pages/Analytics/Analytics'

class MainRoute extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={withRouter(Home)} />
        <Route path="/register" component={withRouter(Register)} />
        <Route path="/booking" component={withRouter(Booking)} />
        <Route path="/bookinghistory" component={withRouter(BookingHistory)} />
        <Route path="/store" component={withRouter(Store)} />
        <Route path="/storemangement" component={withRouter(StoreManagement)} />
        <Route path="/analytics" component={withRouter(Analytics)} />
      </Switch>
    );
  }
}

export default MainRoute;
