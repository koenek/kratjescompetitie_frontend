import axios from 'axios';

import AuthService from "./auth.service";

// const API_URL = 'http://localhost:8080/api/team-management/teams/event/';
const API_URL = `${process.env.REACT_APP_API_URI}/api/team-management/teams/event/`;

const user = AuthService.getCurrentUser();

class EventService {
    async postEventData(teamID, event) {
        const json = JSON.stringify(event);
        try {
            return await axios.post(API_URL + teamID, json, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                }
            })
            .then(response => {
            return response;
            });
        } catch (err) {
            return err.response;
        }
    }
}

export default new EventService();