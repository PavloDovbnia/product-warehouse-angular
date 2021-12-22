import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const TOKEN_TYPE = 'AuthTokenType';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];

  constructor() {
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveTokenType(tokenType: string) {
    window.sessionStorage.removeItem(TOKEN_TYPE);
    window.sessionStorage.setItem(TOKEN_TYPE, tokenType);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  public getTokenType(): string {
    return <string>sessionStorage.getItem(TOKEN_TYPE);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return <string>sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(<string>sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: string) => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }
}
