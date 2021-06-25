import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user-management/users/';

class UserService {
  async getUserData(id, token) {
    let userData = undefined;
    try {
      console.log(API_URL + id);
      return await axios
      .get(API_URL + id, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.status === 200) {
          userData = response.data;
          return userData;
        }
      })
    } catch(err) {
      console.log(err);
    }
    return userData;
  }

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();