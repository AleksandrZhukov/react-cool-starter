import { post } from './apiRequester';

const tokenPath = 'token';

export default {
  setToken(token) {
    localStorage.setItem(tokenPath, token);
  },

  resetData() {
    localStorage.removeItem(tokenPath);
  },

  get token() {
    return localStorage.getItem(tokenPath) || '';
  },

  get isAuthenticated() {
    try {
      return !!this.token;
    } catch (e) {
      return false;
    }
  },

  logIn(data) {
    return post('user/auth-local', data)
      .then(({ data }) => {
        const { accessToken } = data;
        this.setToken(accessToken);
      });
  },

  logOut() {
    this.resetData();
  }
};
