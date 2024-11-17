import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // DONE: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // DONE: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // DONE: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 60) {
        return true; 
        //this is checking if the decoded token is older than 60 seconds ago like I added in auth-routes.ts file for testing purposes of 1min.
      }
    } catch (err) {
      return false;
      //this catch is for if decoding fails with an invalid token
    }
  }

  getToken(): string {
    // DONE: return the token
    const cachedUser = localStorage.getItem('id_token') || '';
    return cachedUser;
  }

  login(idToken: string) {
    // DONE: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // DONE: redirect to the home page (root folder)
    window.location.assign('/');
  }

  logout() {
    // DONE: remove the token from localStorage
    localStorage.removeItem('id_token');
    // DONE: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();
