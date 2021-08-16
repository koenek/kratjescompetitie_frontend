import React, { Component } from "react";

class Loading extends Component {
    render() {
        const { type } = this.props;
        return (
            <div className="Loading">
                <div className="d-flex justify-content-center mb-2">
                    <div className={type === "light" ? "spinner-border text-light" : "spinner-border text-dark"} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <p className={type === "light" ? "text-white" : "text-dark"}>Aan het laden. Even geduld...</p>
                </div>
            </div>
        )
    }
}

export default Loading;