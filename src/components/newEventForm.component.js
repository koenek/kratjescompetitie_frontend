import React, { Component } from "react";

import EventService from "../services/event.service";

import Loading from "./loading.component";

import "./newEventForm.component.css";

class EventForm extends Component {
    constructor(props) {
        super(props);
        this.onChangeMomentString = this.onChangeMomentString.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeOpponent = this.onChangeOpponent.bind(this);
        this.onChangeHomeOrAway = this.onChangeHomeOrAway.bind(this);
        this.onChangeHomeGoals = this.onChangeHomeGoals.bind(this);
        this.onChangeAwayGoals = this.onChangeAwayGoals.bind(this);

        this.onPlayerEventDataListChange = this.onPlayerEventDataListChange.bind(this);
        this.onChangeAanwezig = this.onChangeAanwezig.bind(this);
        this.onChangeGoals = this.onChangeGoals.bind(this);
        this.onChangeAssists = this.onChangeAssists.bind(this);
        this.onChangeAction = this.onChangeAction.bind(this);

        this.handleSave = this.handleSave.bind(this);
        this.saveEvent = this.saveEvent.bind(this);


        this.state = {
            teamData: this.props.teamData,
            "momentString": "",
            "type": "MATCH",
            "opponent": "",
            "atHome": true,
            "homeGoals": 0,
            "awayGoals": 0,
            "result": "",
            "playerEventDataArrayList": [],
            "loading": false,
            "errorMsg": "",
            "successMsg": ""
        }

    }

    componentDidMount() {
        let tempList = [];
        this.props.teamData.teamMembers.forEach(p => {
            tempList.push({
                "playerID": p.id,
                "playerName": p.firstname,
                "played": false,
                "goals": 0,
                "assists": 0,
                "violations": [
                    {
                        "actionId": "",
                        "actionTitle": "",
                        "eventType": "EMPTY",
                        "momentString": ""
                    }
                ]
            })
        });
        this.setState({
            playerEventDataArrayList: tempList
        })
    }

    onChangeMomentString(e) {
        this.setState({
            momentString: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeOpponent(e) {
        this.setState({
            opponent: e.target.value
        });
    }

    onChangeHomeOrAway(e) {
        let val = (e.target.value === "true") ? true : false;
        this.setState({
            atHome: val
        });
    }

    onChangeHomeGoals(e) {
        this.setState({
            homeGoals: e.target.value,
            result: e.target.value + "-" + this.state.awayGoals
        });
    }

    onChangeAwayGoals(e) {
        this.setState({
            awayGoals: e.target.value,
            result: this.state.homeGoals + "-" + e.target.value
        });
    }

    onPlayerEventDataListChange = (playerEventDataList) => {
        this.setState({
            "playerEventDataList": playerEventDataList
        })
    }

    onChangeAanwezig(e) {
        // Zoek de huidige index
        let targetId = e.target.id.substring(2,e.target.length); // haal c_, g_ en a_ van string af
        const index = this.state.playerEventDataArrayList.findIndex((element) => element.playerID === targetId);
        // Maak kopie van array
        let playerEventDataArrayList = [...this.state.playerEventDataArrayList];
        // Zet de aangepaste waarde in de kopie
        playerEventDataArrayList[index].played = e.target.checked;
        // Neem aangepaste array op in setState
        this.setState({ playerEventDataArrayList });
    }

    onChangeGoals(e) {
        // Zoek de huidige index
        let targetId = e.target.id.substring(2,e.target.length); // haal c_, g_ en a_ van string af
        const index = this.state.playerEventDataArrayList.findIndex((element) => element.playerID === targetId);
        // Maak kopie van array
        let playerEventDataArrayList = [...this.state.playerEventDataArrayList];
        // Zet de aangepaste waarde in de kopie
        playerEventDataArrayList[index].goals = e.target.value;
        // Neem aangepaste array op in setState
        this.setState({ playerEventDataArrayList });
    }

    onChangeAssists(e) {
        // Zoek de huidige index
        let targetId = e.target.id.substring(2,e.target.length); // haal c_, g_ en a_ van string af
        const index = this.state.playerEventDataArrayList.findIndex((element) => element.playerID === targetId);
        // Maak kopie van array
        let playerEventDataArrayList = [...this.state.playerEventDataArrayList];
        // Zet de aangepaste waarde in de kopie
        playerEventDataArrayList[index].assists = e.target.value;
        // Neem aangepaste array op in setState
        this.setState({ playerEventDataArrayList });
    }

    onChangeAction(e) {
        let violation;
        let actionId = e.target.value;
        this.state.teamData.actions.forEach(a => {
            if (a.id === actionId) {
                violation = {
                    "actionId": actionId,
                    "actionTitle": a.title,
                    "eventType": this.state.type
                }
            }
        });

        // Zoek de huidige index
        const index = this.state.playerEventDataArrayList.findIndex((element) => element.playerID === e.target.id);
        // Maak kopie van array
        let playerEventDataArrayList = [...this.state.playerEventDataArrayList];
        // Zet de aangepaste waarde in de kopie
        playerEventDataArrayList[index].violations[0] = violation;
        // Neem aangepaste array op in setState
        this.setState({ playerEventDataArrayList });
    }

    handleSave(e) {
        const { momentString, opponent, result, type } = this.state;
        // Input valideren

        this.setState({
            loading: true,
            errorMsg: ""
        }, () => {

            // Elk type
            if (momentString === "") {
                this.setState({
                    errorMsg: "Je hebt geen moment ingevuld",
                    loading: false
                });
                return;
            }

            // Alleen voor wedstrijd
            if (type === "MATCH") {
                if (opponent === "") {
                    this.setState({
                        errorMsg: "Je hebt geen tegenstander ingevuld",
                        loading: false
                    });
                    return;
                }
                if (result === "") {
                    this.setState({
                        errorMsg: "Je hebt geen resultaat ingevuld",
                        loading: false
                    });
                    return;
                }
            }

            this.saveEvent();
        });
    }

    saveEvent() {
        let tempList = [...this.state.playerEventDataArrayList];
        let event = {
            "momentString": this.state.momentString,
            "type": this.state.type,
            "opponent": this.state.opponent,
            "atHome": this.state.atHome,
            "homeGoals": this.state.homeGoals,
            "awayGoals": this.state.awayGoals,
            "result": this.state.result,
            "playerEventDataArrayList": tempList
        }

        EventService.postEventData(
            this.state.teamData.id, event).then(
                (res) => {
                    if (res.status === 201) {
                        this.setState({
                            successMsg: "Event opgeslagen."
                        })
                        window.location.reload();
                    } else {
                        this.setState({
                            loading: false,
                            errorMsg: (res.data.message.length > 0) ? res.data.message : "Opslaan mislukt door onbekende fout. Probeer het nogmaals."
                        });
                        return;
                    }
                })

    }

    render() {
        const { teamData, type, loading } = this.state;
        if (loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <form>
                    <div className="row">
                        <label htmlFor="momentString">Moment: </label>
                        <div className="input-group mb-3">
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="momentString"
                                min="2021-01-01T00:00:00"
                                max="2030-12-31T00:00:00"
                                value={this.state.momentString}
                                onChange={this.onChangeMomentString}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="type">Type: </label>
                        <div className="input-group mb-3">
                            <select className="custom-select" id="types" onChange={this.onChangeType} value={this.state.type}>
                                <option value="MATCH">Wedstrijd</option>
                                <option value="TRAINING">Training</option>
                                <option value="OTHER">Overig</option>
                            </select>
                        </div>
                    </div>

                    {type === "MATCH"
                        ?
                        <div>
                            <div className="row">
                                <label htmlFor="homeOrAway">Uit of thuis: </label>
                                <div className="input-group mb-3">
                                    <select className="custom-select" id="homeOrAway" onChange={this.onChangeHomeOrAway} value={this.state.atHome}>
                                        <option value="true">Thuis</option>
                                        <option value="false">Uit</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="opponent">Tegenstander: </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="opponent"
                                        placeholder="Naam tegenstander..."
                                        value={this.state.opponent}
                                        onChange={this.onChangeOpponent}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="homeOrAway">Resultaat: </label>
                                <div className="input-group mb-3">
                                    <input type="number" className="form-control input-number" placeholder="0" aria-label="homeGoals" onChange={this.onChangeHomeGoals} />
                                    <span className="input-group-text">-</span>
                                    <input type="number" className="form-control input-number" placeholder="0" aria-label="awayGoals" onChange={this.onChangeAwayGoals} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="playerEventDataList">Spelersdata: </label>
                                <div className="PlayerEventDataList">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info">
                                            <div className="row">
                                                <span className="col PlayerEventDataList-title">Naam</span>
                                                <span className="col PlayerEventDataList-title">Aanw</span>
                                                <span className="col PlayerEventDataList-title">Gls</span>
                                                <span className="col PlayerEventDataList-title">Ass</span>
                                                <span className="col PlayerEventDataList-title">Str</span>
                                            </div>
                                        </li>
                                        {teamData.teamMembers.map(p => (
                                            <div className="PlayerEventData" key={p.id}>
                                                {type === "MATCH"
                                                    ?
                                                    <div>
                                                        <li className="list-group-item" key={p.id}>
                                                            <div className="row">
                                                                <span className="col PlayerEventData-text">{p.firstname}</span>
                                                                <span className="col">
                                                                    <div className="form-check form-switch PlayerEventData-checkbox">
                                                                        <input className="form-check-input" type="checkbox" id={`c_${p.id}`} onChange={this.onChangeAanwezig} />
                                                                    </div>
                                                                </span>
                                                                <span className="col">
                                                                    <div className="input-group PlayerEventData-number">
                                                                        <input type="number" className="form-control" placeholder="0" aria-label="goals" aria-describedby="goals" min="0" id={`g_${p.id}`} onChange={this.onChangeGoals} />
                                                                    </div>
                                                                </span>
                                                                <span className="col">
                                                                    <div className="input-group PlayerEventData-number">
                                                                        <input type="number" className="form-control" placeholder="0" aria-label="assists" aria-describedby="assists" min="0" id={`a_${p.id}`} onChange={this.onChangeAssists} />
                                                                    </div>
                                                                </span>
                                                                <span className="col">
                                                                    <div className="input-group mb-3">
                                                                        <select className="custom-select" id={p.id} onChange={this.onChangeAction} >
                                                                            <option defaultValue>Maak een keuze..</option>
                                                                            {teamData.actions.map(a => {
                                                                                return <option value={a.id} key={a.id}>{a.title}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </div>
                                                    :
                                                    type === "TRAINING"
                                                        ?
                                                        <h4>Het was een training</h4>
                                                        :
                                                        <h4>Het was iets anders</h4>
                                                }
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>


                        :
                        type === "TRAINING"
                            ?
                            <div className="row">
                                <label htmlFor="playerEventDataList">Spelersdata: </label>
                                <div className="PlayerEventDataList">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-info">
                                            <div className="row">
                                                <span className="col PlayerEventDataList-title">Naam</span>
                                                <span className="col PlayerEventDataList-title">Streepje</span>
                                            </div>
                                        </li>
                                        {teamData.teamMembers.map(p => (
                                            <div className="PlayerEventData" key={p.id}>
                                                <div>
                                                    <li className="list-group-item" key={p.id}>
                                                        <div className="row">
                                                            <span className="col PlayerEventData-text">{p.firstname}</span>
                                                            <span className="col">
                                                                <div className="input-group mb-3">
                                                                    <select className="custom-select" id={p.id} onChange={this.onChangeAction} >
                                                                        <option defaultValue>Maak een keuze..</option>
                                                                        {teamData.actions.map(a => {
                                                                            return <option value={a.id} key={a.id}>{a.title}</option>
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </li>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            :
                            type === "OTHER"
                                ?
                                <div className="row">
                                    <label htmlFor="playerEventDataList">Spelersdata: </label>
                                    <div className="PlayerEventDataList">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-info">
                                                <div className="row">
                                                    <span className="col PlayerEventDataList-title">Naam</span>
                                                    <span className="col PlayerEventDataList-title">Streepje</span>
                                                </div>
                                            </li>
                                            {teamData.teamMembers.map(p => (
                                                <div className="PlayerEventData" key={p.id}>
                                                    <div>
                                                        <li className="list-group-item" key={p.id}>
                                                            <div className="row">
                                                                <span className="col PlayerEventData-text">{p.firstname}</span>
                                                                <span className="col">
                                                                    <div className="input-group mb-3">
                                                                        <select className="custom-select" id={p.id} onChange={this.onChangeAction} >
                                                                            <option defaultValue>Maak een keuze..</option>
                                                                            {teamData.actions.map(a => {
                                                                                return <option value={a.id} key={a.id}>{a.title}</option>
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </div>
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div></div>
                    }
                    {this.state.errorMsg && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary mt-2" onClick={this.handleSave} disabled={loading ? true : false} >Opslaan</button>
                </form>
            )
        }
    }
}

export default EventForm;