import React, { Component } from "react";
import UserService from "../services/user.service";
import TeamService from "../services/team.service";

import Loading from "./loading.component";

class ConnectModal extends Component {
    constructor(props) {
        super(props);
        this.onChangePlayer = this.onChangePlayer.bind(this);
        this.onChangeTeam = this.onChangeTeam.bind(this);
        this.handleConnect = this.handleConnect.bind(this);

        this.state = {
            players: [],
            selectedPlayerId: "",
            selectedTeamId: "",
            errorMsg: "",
            successMsg: "",
            loading: true
        }
    }

    componentDidMount() {
        const that = this;
        UserService.getUnregisteredUsers(this.props.currentUser.accessToken).then(function (result) {
            that.setState(st => ({
                players: result,
                loading: false
            }));
        });
    }

    onChangePlayer(e) {
        this.setState({
            selectedPlayerId: e.target.value
        });
    }

    onChangeTeam(e) {
        this.setState({
            selectedTeamId: e.target.value
        });
    }

    handleConnect() {
        const { selectedPlayerId,selectedTeamId } = this.state;

        this.setState({
            loading: true,
            errorMsg: ""
        }, () => {
            if (selectedPlayerId.length === 0) {
                this.setState({
                    errorMsg: "Selecteer een speler",
                    loading: false
                });
                return;
            }
            if (selectedTeamId.length === 0) {
                this.setState({
                    errorMsg: "Selecteer een team",
                    loading: false
                });
                return;
            }
            this.connectPlayer();
        });
    }

    connectPlayer() {
        const { selectedPlayerId,selectedTeamId } = this.state;
        
        this.setState({
            loading:true
        }, () => {
            TeamService.connectPlayerToTeam(
                this.props.currentUser.accessToken
                ,selectedTeamId
                ,selectedPlayerId)
                .then(response => {
                    if (response.status !== 200) {
                        if (response.status === 401) {
                            this.setState({
                                errorMsg: `${response.status}: Niet geautoriseerd`,
                                loading: false
                            });
                        } else {
                            this.setState({
                                errorMsg: `${response.status}: ${response.message}`,
                                loading: false
                            });
                        }
                        return;
                    }
                    else {
                        this.setState({
                            successMsg: `Speler gekoppeld`,
                            loading: false
                        });
                        window.location.reload();
                    }
                });
        });
    }

    render() {
        const { loading, players } = this.state;
        const { teamData } = this.props;
        return (
            <div className="ConnectModal mb-2">
                <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#connectModal">
                    Speler koppelen
                </button>

                <div className="modal fade" id="connectModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="connectModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="connectModalLabel">Speler koppelen</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="type">Speler: </label>
                                    <div className="input-group mb-3">
                                        <select className="custom-select" id="players" onChange={this.onChangePlayer}>
                                        <option defaultValue>Kies een speler..</option>
                                            {players && players.map(p => {
                                                return <option value={p.id} key={p.id}>{p.firstname}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="type">Team: </label>
                                    <div className="input-group mb-3">
                                        <select className="custom-select" id="team" onChange={this.onChangeTeam}>
                                        <option defaultValue>Kies een team..</option>
                                            <option value={teamData.id} key={teamData.id}>{teamData.teamName}</option>
                                        </select>
                                    </div>
                                </div>
                                {this.state.errorMsg && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.errorMsg}
                                        </div>
                                    </div>
                                )}
                                {this.state.successMsg && (
                                    <div className="form-group">
                                        <div className="alert alert-success" role="alert">
                                            {this.state.successMsg}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {loading ? (
                                <Loading />
                            ) : (
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuleren</button>
                                    <button type="button" className="btn btn-primary" onClick={this.handleConnect}>Koppelen</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConnectModal;