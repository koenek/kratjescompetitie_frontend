import React, { Component } from "react";

import "./playerList.component.css";

class PlayerList extends Component {

    render() {
        const {players,teamName} = this.props;
        return (
                <div className="PlayerList">
                    <div className="p-2 mb-4 bg-light rounded-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col">
                                <h1 className="display-5 fw-bold">{teamName}</h1>
                                </div>
                                <div className="col">
                                    <img className="PlayerList-header-logo float-end" src="./logo.png" alt="Logo PVC" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="list-group">

                        <li className="list-group-item list-group-item-info">
                            <div className="row">
                                <span className="col">Naam</span>
                                <span className="col">Goals</span>
                                <span className="col">Assists</span>
                                <span className="col">Streepjes</span>
                            </div>
                        </li>
                        {players.map(p => (
                            <li className="list-group-item" key={p.id}>
                                <div className="row">
                                    <span className="col">{p.firstname}</span>
                                    <span className="col">{p.statistics.statistics.GOALS}</span>
                                    <span className="col">{p.statistics.statistics.ASSISTS}</span>
                                    <span className="col">|||</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        )
    }
}

export default PlayerList;