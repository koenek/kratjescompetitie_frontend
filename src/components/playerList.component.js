import React, { Component } from "react";

import "./playerList.component.css";

class PlayerList extends Component {

    render() {
        const { players, teamName } = this.props;
        let punishmentKey = 0;
        return (
            <div className="PlayerList mb-3">
                <div className="p-2 mb-4 bg-light rounded-3 PlayerList-header-container">
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
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="evenementen-tab" data-bs-toggle="tab" data-bs-target="#evenementen" type="button" role="tab" aria-controls="evenementen" aria-selected="true">Wedstrijdstatistieken</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="team-tab" data-bs-toggle="tab" data-bs-target="#team" type="button" role="tab" aria-controls="team" aria-selected="false">Bierstatistieken</button>
                    </li>
                </ul>
                <div className="tab-content pt-3" id="myTabContent">
                    <div className="tab-pane fade show active" id="evenementen" role="tabpanel" aria-labelledby="evenementen-tab">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-info">
                                <div className="row">
                                    <span className="col">Speler</span>
                                    <span className="col">Gesp.</span>
                                    <span className="col">Gls.</span>
                                    <span className="col">Asst.</span>
                                </div>
                            </li>
                            {players.map(p => (
                                <li className="list-group-item" key={p.id}>
                                    <div className="row">
                                        <span className="col">{p.firstname}</span>
                                        <span className="col">{p.statistics.statistics.GAMES}</span>
                                        <span className="col">{p.statistics.statistics.GOALS}</span>
                                        <span className="col">{p.statistics.statistics.ASSISTS}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="tab-pane fade" id="team" role="tabpanel" aria-labelledby="team-tab">
                    <ul className="list-group">
                            <li className="list-group-item list-group-item-info">
                                <div className="row">
                                    <span className="col">Speler</span>
                                    <span className="col">Streepjes</span>
                                    <span className="col">Open</span>
                                    <span className="col">Vold.</span>
                                </div>
                            </li>
                            {players.map(p => (
                                <li className="list-group-item" key={p.id}>
                                    <div className="row">
                                        <span className="col">{p.firstname}</span>
                                        <span className="col">{p.statistics.statistics.TALLYCOUNT}</span>
                                        <span className="col">
                                        {p.punishments.map(p => {
                                            if(!p.satisfied) return <i className="fas fa-beer beer-open" key={punishmentKey++} ></i>;
                                            return "";
                                        })}
                                        </span>
                                        <span className="col">
                                        {p.punishments.map(p => {
                                            if(p.satisfied) return <i className="fas fa-beer beer-closed" key={punishmentKey++} ></i>;
                                            return "";
                                        })}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

export default PlayerList;