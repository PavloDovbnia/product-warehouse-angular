import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {JwtResponse} from './jwt-response';
import {AuthLoginInfo} from './login-info';
import {RegisterInfo} from './register-info';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/auth/signin';
  private registerUrl = 'http://localhost:8080/api/auth/register';

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  register(info: RegisterInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, info, httpOptions);
  }

  constructor(private http: HttpClient) {
  }
}
