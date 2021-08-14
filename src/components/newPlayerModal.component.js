import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "./modal.component.css";

class NewPlayerModal extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            errorMsg: "",
            successMsg: "",
            loading: false
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    handleAdd() {
        const { username, password, firstname, lastname } = this.state;

        this.setState({
            loading: true,
            errorMsg: ""
        }, () => {
            if (username.length < 3) {
                this.setState({
                    errorMsg: "Gebruikersnaam mag niet korter dan 3 karakters zijn",
                    loading: false
                });
                return;
            }
            if (password.length < 8) {
                this.setState({
                    errorMsg: "Wachtwoord mag niet korter dan 8 karakters zijn",
                    loading: false
                });
                return;
            }
            if (firstname.length < 2) {
                this.setState({
                    errorMsg: "Voornaam mag niet korter zijn dan 2 karakters",
                    loading: false
                });
                return;
            }
            if (lastname.length < 2) {
                this.setState({
                    errorMsg: "Achternaam mag niet korter zijn dan 2 karakters",
                    loading: false
                });
                return;
            }
            this.addPlayer();
        });
    }

    addPlayer() {
        const { username, password, firstname, lastname } = this.state;

        this.setState({
            loading: true
        }, () => {
            AuthService.register(username, password, firstname, lastname)
                .then(response => {
                    if (response.status !== 200) {
                        this.setState({
                            errorMsg: `${response.status}: ${response.message}`,
                            loading: false
                        });
                        return;
                    }
                    else {
                        this.setState({
                            successMsg: `Speler aangemaakt`,
                            loading: false
                        });
                        window.location.reload();
                    }
                });

        });


    }


    render() {
        const { loading } = this.state;
        return (
            <div className="NewPlayerModal mb-1">
                <button type="button" className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Speler aanmaken
                </button>

                <div className="modal fade" id="exampleModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Speler aanmaken</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <label htmlFor="username">Gebruiksnaam: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="password">Wachtwoord: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                        />
                                    </div>
                                    <p>Let op: adviseer de gebruiker zijn/haar wachtwoord te wijzigen na de eerste keer inloggen</p>
                                </div>
                                <div className="row">
                                    <label htmlFor="firstname">Voornaam: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            value={this.state.firstname}
                                            onChange={this.onChangeFirstname}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="lastname">Achternaam: </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            value={this.state.lastname}
                                            onChange={this.onChangeLastname}
                                        />
                                    </div>
                                    <p>Let op: Je moet de speler na het aanmaken nog wel koppelen aan een team</p>
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
                                <div class="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            ) : (
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuleren</button>
                                    <button type="button" className="btn btn-primary" onClick={this.handleAdd}>Toevoegen</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NewPlayerModal;