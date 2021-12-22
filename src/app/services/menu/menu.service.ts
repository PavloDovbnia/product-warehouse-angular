import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from "./menu";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url = 'http://localhost:8080/api/menu/get';

  constructor(private http: HttpClient) {
  }

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.url);
  }
}
