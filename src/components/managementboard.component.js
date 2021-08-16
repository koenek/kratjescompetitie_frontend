import React, { Component } from "react";
import "./managementboard.component.css";

import TeamService from "../services/team.service";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventList from "./eventList.component";
import ManagementPlayerList from "./managementPlayerList.component";
import EventModal from "./newEventModal.component";
import NewPlayerModal from "./newPlayerModal.component";
import ConnectModal from "./connectPlayerToTeamModal.component";

import Loading from "./loading.component";
import PunishmentModal from "./playerPunishmentModal.component";

class ManagementBoard extends Component {
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
        const user = AuthService.getCurrentUser();
        let userData, teamData;
        UserService.getUserData(user.id, user.accessToken).then(response => {
            userData = response;
            TeamService.getTeamData(userData.teamId, user.accessToken).then(function (result) {
                that.setState(st => ({
                    teamData: result,
                    players: result.teamMembers,
                    isLoading: false
                }));
            });
        });

        // TeamService.getTeamData(this.props.teamId, this.state.currentUser.accessToken).then(function (result) {
        //     that.setState(st => ({
        //         teamData: result,
        //         players: result.teamMembers,
        //         isLoading: false
        //     }));
        // });
    }

    componentDidUpdate() {
        if (this.state.players === undefined) {
            const that = this;
            const user = AuthService.getCurrentUser();
            let userData, teamData;
            UserService.getUserData(user.id, user.accessToken).then(response => {
                userData = response;
                TeamService.getTeamData(userData.teamId, user.accessToken).then(function (result) {
                    that.setState(st => ({
                        teamData: result,
                        players: result.teamMembers,
                        isLoading: false
                    }));
                });
            });
        }
    }

    render() {
        const { teamData, isLoading, currentUser } = this.state;
        if (isLoading) {
            return (
                <div className="ManagementBoard mt-5">
                    <Loading type="light" />
                </div>
            )
        } else {
            return (
                <div className="ManagementBoard mt-5">
                    <div className="container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="evenementen-tab" data-bs-toggle="tab" data-bs-target="#evenementen" type="button" role="tab" aria-controls="evenementen" aria-selected="true">Evenementen</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="team-tab" data-bs-toggle="tab" data-bs-target="#spelers" type="button" role="tab" aria-controls="team" aria-selected="false">Spelers</button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button className="nav-link" id="nieuws-tab" data-bs-toggle="tab" data-bs-target="#nieuws" type="button" role="tab" aria-controls="nieuws" aria-selected="false">Nieuws</button>
                            </li> */}
                        </ul>
                        <div className="tab-content pt-3" id="myTabContent">
                            <div className="tab-pane fade show active" id="evenementen" role="tabpanel" aria-labelledby="evenementen-tab">
                                <p>
                                    Op dit tabblad kunnen nieuwe evenementen worden aangemaakt.
                                </p>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <EventModal teamData={teamData} />
                                    </div>
                                    <div className="col-sm-9">
                                        {isLoading ? <span className="spinner-border spinner-border-sm"></span> : <EventList events={teamData.events} />}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="spelers" role="tabpanel" aria-labelledby="spelers-tab">
                                <p>
                                    Op dit tabblad kan je o.a. spelers aanmaken en aan je team toevoegen.
                                </p>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <NewPlayerModal />
                                        <ConnectModal teamData={teamData} currentUser={currentUser} />
                                        <PunishmentModal players={teamData.teamMembers} currentUser={currentUser} />
                                    </div>
                                    <div className="col-sm-9">
                                        {isLoading ? <span className="spinner-border spinner-border-sm"></span> : <ManagementPlayerList players={teamData.teamMembers} />}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="tab-pane fade" id="nieuws" role="tabpanel" aria-labelledby="nieuws-tab">
                                <p>
                                    Op dit tabblad kan je handmatig nieuwsitems aanmaken.
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>
            )
        }

    }
}

export default ManagementBoard;