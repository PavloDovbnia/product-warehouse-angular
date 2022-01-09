import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) {
  }

  private dataSourceUsers = new BehaviorSubject<User[]>(new Array<User>());
  private dataSourceUser = new BehaviorSubject<User>(User.empty());
  sharingUsers = this.dataSourceUsers.asObservable();
  sharingUser = this.dataSourceUser.asObservable();

  shareUsers(users: User[]) {
    this.dataSourceUsers.next(users);
  }

  shareUser(user: User) {
    this.dataSourceUser.next(user);
  }

  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'getRoles');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'getUsers');
  }

  saveUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl + 'saveUser', user);
  }

  deleteUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.baseUrl + 'deleteUser', user);
  }
}
