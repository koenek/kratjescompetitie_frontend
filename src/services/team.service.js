import axios from 'axios';

const API_URL = 'http://localhost:8080/api/team-management/teams/';

class TeamService {
  async getTeamData(id, token) {
    let teamData = undefined;
    try {
      return await axios
        .get(API_URL + id, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          if (response.status === 200) {
            teamData = response.data;
            return teamData;
          }
        })
    } catch (err) {
      return err.response;
    }
    return null;
  }

  async connectPlayerToTeam(token, teamId, playerId) {
    try {
      return await axios
        .put(API_URL + `${teamId}/${playerId}`, {
          Authorization: `Bearer ${token}`
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          if (response.status === 200) {
            return response;
          }
        });
    } catch (err) {
      return err.response;
    }
  }
}

export default new TeamService();