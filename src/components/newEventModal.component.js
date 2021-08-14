import React, { Component } from "react";

import EventForm from "./newEventForm.component";

import "./newEventModal.component.css";

class EventModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamData: this.props.teamData
        }
    }

    render() {
        const { teamData } = this.state;
        console.log(teamData);
        return (
            <div className="EventModal mb-4">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Nieuw evenement aanmaken
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Evenement aanmaken</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                                <EventForm teamData={teamData} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventModal;