import React, { Component } from "react";

import "./eventList.component.css";

class EventList extends Component {
    constructor(props) {
        super(props);
        this.parseMoment = this.parseMoment.bind(this);
    }
    parseMoment(str) {
        let newStr = str.substring(8,10) 
        + "-" 
        + str.substring(5,7) 
        + "-" 
        + str.substring(0,4)
        + " "
        + str.substring(11,16);
        return newStr;
    }
    render() {
        const {events} = this.props;
        return (
                <div className="EventList mb-2">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-info">
                            <div className="row">
                                <span className="col">Type</span>
                                <span className="col">Tijdstip</span>
                                <span className="col">Tegenstander</span>
                            </div>
                        </li>
                        {events.map(e => (
                            <button className="list-group-item list-group-item-clickable" key={e.id}>
                                <div className="row">
                                    <span className="col">{e.type === "MATCH" ? "Wedstrijd" : e.type === "TRAINING" ? "Training" : "Overig"}</span>
                                    <span className="col">{this.parseMoment(e.moment)}</span>
                                    <span className="col">{(e.opponent !== "") ? e.opponent : "n.v.t."}</span>
                                </div>
                            </button>
                        ))}
                    </ul>
                </div>
        )
    }
}

export default EventList;