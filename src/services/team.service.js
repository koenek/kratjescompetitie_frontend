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
    } catch(err) {
      alert(err);
    }
    return null;
  }
}

export default new TeamService();