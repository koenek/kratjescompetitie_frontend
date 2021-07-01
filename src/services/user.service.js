import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user-management/users/';

class UserService {
  async getUserData(id, token) {
    let userData = undefined;
    try {
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

  async updateUserData(id, token, newUsername, newPassword) {
    try {
      return await axios
      .put(API_URL + id, {
        Authorization: `Bearer ${token}`,
        username: (newUsername) ? newUsername : null,
        password: (newPassword) ? newPassword : null
      }, {
        headers: { Authorization: `Bearer ${token}` },
        body   : {
          "username": (newUsername) ? newUsername : null,
          "password": (newPassword) ? newPassword : null
        }
      })
      .then(response => {
        if (response.status === 200) {
          return response;
        }
      })
    } catch(err) {
      return err.response;
    }
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