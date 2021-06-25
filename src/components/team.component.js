import React, { Component } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import "./team.component.css";

class TeamPage extends Component {
  constructor(props) {
    super(props);

    const user = AuthService.getCurrentUser();
    
    this.state = {
      currentUser: user,
      userData: '',
      userStats: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const that = this;
    UserService.getUserData(this.state.currentUser.id, this.state.currentUser.accessToken).then(function (result) {
      console.log(result);
      that.setState(st => ({
        userData: result,
        userStats: result.statistics.statistics
      }));
    });
  }

  render() {
   return <h1>Team Page</h1>
  }
}

export default TeamPage;