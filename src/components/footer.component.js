import React, { Component } from "react";
import "./footer.component.css";

class Footer extends Component {
    render() {
        return (
            <footer className="text-center">
                <div className="text-center p-3">
                    © 2021
                    <a className="ml-3" href="https://kevinkoene.nl"><span>kevinkoene.nl</span></a>
                </div>
            </footer>
        )
    }
}

export default Footer;