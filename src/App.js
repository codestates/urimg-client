import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Main from "./pages/Main";
import Login from "./pages/Login";

class App extends Component {
  state = {
    isLogin: false,
    userinfo: null,
  };

  render() {
    const { isLogin, userinfo } = this.state;

    return (
      <Switch>
        <Route path='/' render={() => (<Main />)} />
        {/* <Route
        exact path='/login'
        render={() => (<Login />)}
        />
        <Route
        exact path='/signup'
        render={() => <Signup />}
        /> */}
      </Switch>
    );
  }
}

export default withRouter(App);
