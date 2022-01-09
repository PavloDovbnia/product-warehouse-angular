import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {RegisterInfo} from './register-info';
import {ResetPasswordInfo} from "./reset-password-info";
import {ChangePasswordInfo} from "./change-password-info";
import {SaveNewPasswordInfo} from "./save-new-password-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private registerUrl = 'http://localhost:8080/api/auth/register';
  private resetPasswordUrl = 'http://localhost:8080/api/user/resetPassword';
  private savePasswordUrl = 'http://localhost:8080/api/user/savePassword';
  private changePasswordUrl = 'http://localhost:8080/api/user/changePassword';

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  register(info: RegisterInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, info, httpOptions);
  }

  resetPassword(info: ResetPasswordInfo): Observable<string> {
    return this.http.post<string>(this.resetPasswordUrl, info, httpOptions);
  }

  savePassword(info: SaveNewPasswordInfo): Observable<string> {
    return this.http.post<string>(this.savePasswordUrl, info, httpOptions);
  }

  changePassword(info: ChangePasswordInfo): Observable<string> {
    return this.http.post<string>(this.changePasswordUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) {
  }
}
