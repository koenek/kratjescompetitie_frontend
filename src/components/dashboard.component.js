import React, { Component } from "react";
import { Redirect } from "react-router";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import UserdataModal from "./userdataModal.component";
import Loading from "./loading.component";

import "./dashboard.component.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
      userData: "",
      userStats: "",
      isLoading: true,
      formattedTally: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({
      currentUser: user
    }, () => {
      if (this.state.currentUser) {
        const that = this;
        UserService.getUserData(this.state.currentUser.id, this.state.currentUser.accessToken).then(function (result) {
          that.setState(st => ({
            userData: result, 
            userStats: result.statistics.statistics,
            isLoading: false
          }));
        });
      }
    });
  }

  render() {
    const { currentUser, userData, userStats, isLoading } = this.state;
    if (isLoading) {
      return (
        <main className="Dashboard mt-5">
          <Loading type={"light"} />
        </main>
      )
    } else {
      // userStats.TALLYCOUNT omzetten in streepjes
      let formattedTallyString = "";
      for (let i = 0; i < this.state.userStats.TALLYCOUNT; i++) {
        formattedTallyString += "|";
      }

      let punishmentKey = 0;

      return (
        <div className="container py-3">
          {currentUser ? (
            <main className="Dashboard">
              <div className="row">
                <h1 className="Dashboard-welcome mt-5 mb-5">
                  Welkom {userData.firstname}
                </h1>
              </div>
              {/* <div className="row row-cols-1 row-cols-md-12 mt-3 mb-3 mr-1 ml-1 text-center">
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
              </div> */}
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
                        <div className="row">
                          <div className="col">
                            <li>Wedstrijden: </li>
                          </div>
                          <div className="col">
                            {userStats.GAMES}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <li>Goals: </li>
                          </div>
                          <div className="col">
                            {userStats.GOALS}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <li>Assists: </li>
                          </div>
                          <div className="col">
                            {userStats.ASSISTS}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <li>Streepjes: </li>
                          </div>
                          <div className="col">
                            {formattedTallyString}
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card mb-4 rounded-3 shadow-sm">
                    <div className="card-header py-3">
                      <h4 className="my-0 fw-normal">Kratjes</h4>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mt-3">
                        <div className="row">
                          <div className="col">
                            <li>Openstaand: </li>
                          </div>
                          <div className="col">
                            {userData.punishments.map(p => {
                              if (!p.satisfied) {
                                return <i className="fas fa-beer beer-open" key={punishmentKey++} ></i>
                              }
                              return ""
                            })}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <li>Voldaan: </li>
                          </div>
                          <div className="col">
                            {userData.punishments.map(p => {
                              if (p.satisfied) {
                                return <i className="fas fa-beer beer-closed" key={punishmentKey++} ></i>
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      )
    }

  }
}

export default Dashboard;