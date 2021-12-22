import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ItemProperty} from "./item-property";

@Injectable({
  providedIn: 'root'
})
export class ItemPropertiesService {

  private baseUrl = 'http://localhost:8080/api/item/property/';

  constructor(private http: HttpClient) {
  }

  private dataSourceProperties = new BehaviorSubject<ItemProperty[]>(new Array<ItemProperty>());
  private dataSourceProperty = new BehaviorSubject<ItemProperty>(ItemProperty.empty());
  sharingProperties = this.dataSourceProperties.asObservable();
  sharingProperty = this.dataSourceProperty.asObservable();

  shareProperties(properties: ItemProperty[]) {
    this.dataSourceProperties.next(properties);
  }

  shareProperty(property: ItemProperty) {
    this.dataSourceProperty.next(property);
  }

  getInitData(): Observable<object> {
    return this.http.get<object>(this.baseUrl + 'getInitData');
  }

  getProperties(itemLevel: string): Observable<ItemProperty[]> {
    return this.http.get<ItemProperty[]>(this.baseUrl + itemLevel.toLowerCase() + '/getAll');
  }

  saveProperty(property: ItemProperty): Observable<ItemProperty[]> {
    return this.http.post<ItemProperty[]>(this.baseUrl + 'save', property);
  }

  deleteProperty(property: ItemProperty): Observable<ItemProperty[]> {
    return this.http.post<ItemProperty[]>(this.baseUrl + 'delete', property);
  }
}
