import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";
import ManagementBoard from "./components/managementboard.component";
import TeamPage from "./components/team.component";
import { Spinner } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      userData: undefined,
      isLoading: true
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isMod: user.roles.includes("ROLE_MODERATOR"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
        isLoading: false
      });
      this.getData(user);
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }

  getData(user) {
    const that = this;
    UserService.getUserData(user.id, user.accessToken).then(function (result) {
      that.setState(st => ({
        userData: result,
        isLoading: false
      }));
    });
  }

  render() {
    const { currentUser, userData, isMod, isAdmin, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      return (
        <div className="App">

          <Navbar
            user={currentUser}
            isAdmin={isAdmin}
            isMod={isMod}
            userData={userData}
            history={this.props.history}
          />

            <Switch>
              <Route exact path="/login" render={routeProps => (isLoading) ? <Spinner /> : (userData) ? <Redirect to="/dashboard" /> : <Login {...routeProps} />} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/" render={() => (userData) ? <Dashboard /> : <Login />} />
              <Route exact path="/dashboard" render={() => (isLoading) ? <Spinner /> : (!userData) ? <Redirect to="/login" /> : <Dashboard />} />
              <Route exact path="/team" render={() => (isLoading) ? <Spinner /> : (userData && userData.teamId !== "Unregistered") ? <TeamPage teamId={userData && userData.teamId} /> : <Dashboard />} />
              <Route exact path="/beheer" render={() => (isLoading) ? <Spinner /> : (isMod || isAdmin) ? <ManagementBoard user={currentUser} teamId={userData && userData.teamId} /> : <Dashboard />} />
            </Switch>


          <Footer />
        </div>
      );
    }
  }
}

export default App