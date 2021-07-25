import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import UserService from "./services/user.service";

import Navbar from "./components/navbar.component";
import Footer from "./components/footer.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Dashboard from "./components/dashboard.component";
import ManagementBoard from "./components/managementboard.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
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
        isAdmin: user.roles.includes("ROLE_ADMIN")
      });
      this.getData(user);
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
    return (
      <div className="App">

        <Navbar
          user={currentUser}
          isAdmin={isAdmin}
          isMod={isMod}
        />


        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/dashboard" render={() => (isLoading) ? <Spinner /> : <Dashboard />} /*component={Dashboard}*/ />
          <Route exact path="/team" render={() => (isLoading) ? <Spinner /> : (userData.teamId !== "Unregistered") ? <TeamPage teamId={userData.teamId} /> : <Dashboard />} />
          <Route exact path="/beheer" render={() => (isLoading) ? <Spinner /> : (isMod || isAdmin) ? <ManagementBoard user={currentUser} teamId={userData.teamId} /> : <Dashboard />} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>


        <Footer />
      </div>
    );
  }
}

export default App