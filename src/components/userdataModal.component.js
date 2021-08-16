import React, { Component } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import Loading from "./loading.component";

class UserDataModal extends Component {
    constructor(props) {
        super(props);
        this.onChangeNewUsername = this.onChangeNewUsername.bind(this);
        this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeNewPasswordConfirmation = this.onChangeNewPasswordConfirmation.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            "newUsername": "",
            "oldPassword": "",
            "newPassword": "",
            "newPasswordConfirmation": "",
            "loading": false,
            "errorMsg": "",
            "successMsg": ""
        }
    }

    handleClick(e) {
        const { user } = this.props;
        const { newUsername, newPassword, newPasswordConfirmation } = this.state;

        this.setState({
            errorMsg: "",
            loading: true
        }, () => {
            if (newPassword === "" && newUsername === "") {
                this.setState({
                    errorMsg: "Je hebt geen gegevens ingevoerd",
                    loading: false
                });
                return;
            }

            if (newPassword !== newPasswordConfirmation) {
                this.setState({
                    loading: false,
                    errorMsg: "Wachtwoorden niet gelijk aan elkaar"
                });
                return;
            }

            if (newPassword.length !== 0 && newPassword.length < 8) {
                this.setState({
                    loading: false,
                    errorMsg: "Wachtwoord mag niet korten zijn dan 8 karakters"
                });
                return;
            }

            UserService.updateUserData(
                user.id
                , user.accessToken
                , newUsername
                , newPassword).then(
                    (res) => {
                        console.log(res);
                        if (res.status === 200) {
                            AuthService.logout();
                            window.location.reload();
                        } else if (res.status === 400) {
                            this.setState({
                                loading: false,
                                errorMsg: res.data.message
                            })
                        } 
                        else {
                            this.setState({
                                loading: false,
                                errorMsg: "Oeps. Er ging iets fout. Onze excuses voor het ongemak.\nNeem contact op met de beheerder van deze website als dit probleem zicht blijft voordoen."
                            })
                        }
                    }
                )
        });
    }

    onChangeNewUsername(e) {
        this.setState({
            newUsername: e.target.value
        });
    }

    onChangeOldPassword(e) {
        this.setState({
            oldPassword: e.target.value
        })
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    onChangeNewPasswordConfirmation(e) {
        this.setState({
            newPasswordConfirmation: e.target.value
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="UserDataModal">
                <div className="d-grid gap-2 col-6 mx-auto pt-4">
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Wijzigen
                    </button>
                </div>

                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Gegevens wijzigen</h5>
                                <p>Vul alleen de gegevens in die je wilt wijzigen</p>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="newUsername">Nieuwe gebruiksnaam: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="newUsername"
                                            value={this.state.newUsername}
                                            onChange={this.onChangeNewUsername}
                                        />
                                    </div>
                                </div>
                                {/* <div className="row">
                                        <label htmlFor="oldPassword">Oud wachtwoord: </label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Oud wachtwoord"
                                                name="oldPassword"
                                                value={this.state.oldPassword}
                                                onChange={this.onChangeOldPassword}
                                            />
                                        </div>
                                    </div> */}
                                <div className="row">
                                    <label htmlFor="newPassword">Nieuw wachtwoord: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="newPassword"
                                            value={this.state.newPassword}
                                            onChange={this.onChangeNewPassword}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="newPasswordConfirmation">Bevestiging nieuw wachtwoord: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="newPasswordConfirmation"
                                            value={this.state.newPasswordConfirmation}
                                            onChange={this.onChangeNewPasswordConfirmation}
                                        />
                                    </div>
                                </div>
                                {this.state.errorMsg && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.errorMsg}
                                        </div>
                                    </div>
                                )}
                                <p>Let op: Na het wijzigen van je gegevens moet je opnieuw inloggen</p>
                                {loading
                                    ?
                                    (
                                        <Loading />
                                    )
                                    :
                                    (
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" disabled={loading}>Annuleren</button>
                                            <button type="button" className="btn btn-primary" onClick={this.handleClick} disabled={loading}>Opslaan</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDataModal;