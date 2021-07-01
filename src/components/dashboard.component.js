import React, { Component } from "react";
import { Redirect } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import UserdataModal from "./userdataModal.component";

import "./dashboard.component.css";

class Dashboard extends Component {
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
    if (this.state.currentUser) {
      const that = this;
      UserService.getUserData(this.state.currentUser.id, this.state.currentUser.accessToken).then(function (result) {
        that.setState(st => ({
          userData: result,
          userStats: result.statistics.statistics
        }));
      });
    }

  }

  render() {
    const { currentUser, userData, userStats } = this.state;
    return (
      <div className="container py-3">
        {currentUser ? (
          <main className="Dashboard">
            <div className="row">
              <h1 className="Dashboard-welcome mt-5 mb-5">
                Welkom {userData.username}
              </h1>
            </div>
            <div className="row row-cols-1 row-cols-md-12 mt-3 mb-3 mr-1 ml-1 text-center">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">Nieuws</h4>
                </div>
                <div className="card-body">
                  <div className="Dashboard-news-item">
                    <div className="d-flex w-100 justify-content-between">
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>3 days ago</small>
                    </div>
                  </div>
                  <div className="Dashboard-news-item">
                    <div className="d-flex w-100 justify-content-between">
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>3 days ago</small>
                    </div>
                  </div><div className="Dashboard-news-item">
                    <div className="d-flex w-100 justify-content-between">
                      <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                      <small>3 days ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Gegevens</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mt-3">
                      <div className="row">
                        <div className="col">
                          <li>Gebruikersnaam: </li>
                        </div>
                        <div className="col">
                          {userData.username}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <li>Wachtwoord: </li>
                        </div>
                        <div className="col">
                          ********
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <UserdataModal user={currentUser} />
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Statistieken</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mt-3">
                      <li>Goals: {userStats.GOALS}</li>
                      <li>Assists: {userStats.ASSISTS}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Team</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mt-3">
                      <button className="btn btn-outline-primary">{userData.teamName}</button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <Redirect to="/"/>
        )}
      </div>
    )
  }
}

export default Dashboard;