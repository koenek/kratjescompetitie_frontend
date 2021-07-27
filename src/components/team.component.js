import React, { Component } from "react";
import PlayerList from "./playerList.component";

import AuthService from "../services/auth.service";
import TeamService from "../services/team.service";

import "./team.component.css";

class TeamPage extends Component {
  constructor(props) {
    super(props);

    const user = AuthService.getCurrentUser();

    this.state = {
      currentUser: user,
      teamData: '',
      players: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const that = this;
    TeamService.getTeamData(this.props.teamId, this.state.currentUser.accessToken).then(function (result) {
      that.setState(st => ({
        teamData: result,
        players: result.teamMembers,
        isLoading: false
      }));
    });
  }

  render() {
    const { teamData, players, isLoading } = this.state;
    console.log(teamData)
    return (
      <div className="TeamPage mt-5">
        <div className="container">
          {isLoading ? (
            <h1>LOADING....</h1>
          ) : (
            <PlayerList players={players} teamName={teamData.teamName} />
          )}
        </div>
      </div>
    )
  }
}

export default TeamPage;