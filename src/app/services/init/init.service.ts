import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class InitService {

  private baseUrl = 'http://localhost:8080/api/init/';

  constructor(private http: HttpClient) {
  }

  getInitData(): Observable<object> {
    return this.http.get(this.baseUrl + 'getData');
  }
}
