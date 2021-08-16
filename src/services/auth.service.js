import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(username, password, firstname, lastname) {
    try {
      return await axios.post(API_URL + "signup", {
        username,
        password,
        firstname,
        lastname
      })
        .then(response => {
          return response;
        });
    } catch (err) {
      alert(err);
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();