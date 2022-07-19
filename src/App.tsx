import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";

import AuthEventHandler from "./common/AuthEventHandler";
import { AppHeader } from './components/Layout/Appheader';

type Props = {};

type State = {
  currentUser: IUser | undefined
}



class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    AuthEventHandler.on("logout", this.logOut);
  }

  componentWillUnmount() {
    AuthEventHandler.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="bg-light" style={{ minHeight: '100vh' }}>
        <AppHeader logOut={this.logOut} currentUser={currentUser} />
        <div className="container mt-3">
          <Switch>

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route exact path={"/"} render={(props: any) => currentUser?.id ? <Profile {...props} /> : <Login {...props} />} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;