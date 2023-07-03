import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // checks for a saved token and checks that it's valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    //gets token from localstorage
    return localStorage.getItem("id_token");
  }

  login(idToken) {
    //saves user token to localstorage
    localStorage.setItem("id_token", idToken);
    //point to homepage
    window.location.assign("/");
  }

  logout() {
    //clears user token and profile data from localstorage
    localStorage.removeItem("id_token");
    //point to homepage as well as reload the page
    window.location.assign("/");
  }
}

const Auth = new AuthService();
export default Auth;
