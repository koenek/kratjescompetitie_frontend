import React, { Component } from "react";
import UserService from "../services/user.service";

class PunishmentModal extends Component {
    constructor(props) {
        super(props);
        this.onChangePlayer = this.onChangePlayer.bind(this);
        this.handleCheckOff = this.handleCheckOff.bind(this);

        this.state = {
            selectedPlayerId: "",
            errorMsg: "",
            successMsg: "",
            loading: false
        }
    }

    onChangePlayer(e) {
        this.setState({
            selectedPlayerId: e.target.value
        });
    }

    handleCheckOff() {
        const { selectedPlayerId } = this.state;
        const { currentUser } = this.props;
        if (selectedPlayerId.length === 0 || selectedPlayerId === "Kies een speler..") {
            this.setState({
                errorMsg: "Je hebt geen speler geselecteerd",
                loading: false
            });
            return;
        }

        UserService.togglePunishment(currentUser.accessToken,selectedPlayerId)
        .then(response => {

            if(response.id) {
                this.setState({
                    successMsg: `Kratje afgevinkt`,
                    loading: false
                });
                window.location.reload();
                return;
            }

            if (response.status !== 200) {
                if (response.status === 401) {
                    this.setState({
                        errorMsg: `${response.status}: Niet geautoriseerd`,
                        loading: false
                    });
                } else if (response.status === 404) {
                    this.setState({
                        errorMsg: `Speler heeft geen kratje om af te vinken`,
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
        });
    }

    render() {
        const { loading } = this.state;
        const { players } = this.props;
        return (
            <div className="PunishmentModal mb-1">
                <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#punishmentModal">
                    Kratje afvinken
                </button>

                <div className="modal fade" id="punishmentModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="punishmentModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="punishmentModalLabel">Kratje afvinken</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="type">Speler: </label>
                                    <div className="input-group mb-3">
                                        <select className="custom-select" id="players" onChange={this.onChangePlayer}>
                                            <option defaultValue>Kies een speler..</option>
                                            {players && players.map(p => {
                                                if (p.punishments.length > 0) {
                                                    return <option value={p.id} key={p.id}>{p.username}</option>
                                                }
                                            })}
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
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuleren</button>
                                    <button type="button" className="btn btn-primary" onClick={this.handleCheckOff}>Afvinken</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PunishmentModal;