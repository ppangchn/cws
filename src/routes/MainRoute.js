import React, { Component } from "react";
import {
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";

class MainRoute extends Component {
  componentWillReceiveProps(props) {
    console.log(props);
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" component={withRouter(Home)} />
        <Route path="/register" component={withRouter(Register)} />
      </Switch>
    );
  }
}

export default MainRoute;
