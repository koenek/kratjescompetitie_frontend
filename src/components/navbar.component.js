import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { user, isAdmin, isMod, userData } = this.props;
        console.log(userData);
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <Link to={"/"} className="navbar-brand">
                    KratjesCompetitie
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {userData ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/dashboard"} className="nav-link">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/team"} className="nav-link">
                                    Team
                                </Link>
                            </li>
                            {(isAdmin || isMod) &&
                                <li className="nav-item">
                                    <Link to={"/beheer"} className="nav-link">
                                        Beheer
                                    </Link>
                                </li>
                            }
                            {/* <li className="nav-item">
          <Link to={"/profile"} className="nav-link">
            {user.username}
          </Link>
        </li> */}
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    Uitloggen
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Inloggen
                                </Link>
                            </li>

                            {/* <li className="nav-item">
          <Link to={"/register"} className="nav-link">
            Registreren
          </Link>
        </li> */}
                        </div>
                    )}
                </div>
            </nav>
        )
    }
}

export default Navbar;