import React, { Component } from "react";

class ManagementPlayerList extends Component {
    render() {
        const { players } = this.props;
        let punishmentKey = 0;
        return (
            <div className="ManagementPlayerList">
                {/* <ul className="list-group">
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
                </ul> */}

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="wedstrijden-tab" data-bs-toggle="tab" data-bs-target="#wedstrijden" type="button" role="tab" aria-controls="wedstrijden" aria-selected="true">Wedstrijdstatistieken</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="bier-tab" data-bs-toggle="tab" data-bs-target="#bier" type="button" role="tab" aria-controls="bier" aria-selected="false">Bierstatistieken</button>
                    </li>
                </ul>
                <div className="tab-content pt-3" id="myTabContent">
                    <div className="tab-pane fade show active" id="wedstrijden" role="tabpanel" aria-labelledby="wedstrijden-tab">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-info">
                                <div className="row">
                                    <span className="col">Speler</span>
                                    <span className="col">Gesp.</span>
                                    <span className="col">Gls.</span>
                                    <span className="col">Asst.</span>
                                </div>
                            </li>
                            {players && players.map(p => (
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
                    <div className="tab-pane fade" id="bier" role="tabpanel" aria-labelledby="bier-tab">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-info">
                                <div className="row">
                                    <span className="col">Speler</span>
                                    <span className="col">Streepjes</span>
                                    <span className="col">Open</span>
                                    <span className="col">Vold.</span>
                                </div>
                            </li>
                            {players && players.map(p => (
                                <li className="list-group-item" key={p.id}>
                                    <div className="row">
                                        <span className="col">{p.firstname}</span>
                                        <span className="col">{p.statistics.statistics.TALLYCOUNT}</span>
                                        <span className="col">
                                            {p.punishments.map(p => {
                                                if (!p.satisfied) return <i className="fas fa-beer beer-open" key={punishmentKey++} ></i>;
                                                return "";
                                            })}
                                        </span>
                                        <span className="col">
                                            {p.punishments.map(p => {
                                                if (p.satisfied) return <i className="fas fa-beer beer-closed" key={punishmentKey++} ></i>;
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

export default ManagementPlayerList;