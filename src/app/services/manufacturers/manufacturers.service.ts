import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Manufacturer} from "./Manufacturer";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ManufacturersService {

  private baseUrl = 'http://localhost:8080/api/product/manufacturer/';

  constructor(private http: HttpClient) {
  }

  private dataSourceManufacturers = new BehaviorSubject<Manufacturer[]>(new Array<Manufacturer>());
  private dataSourceManufacturer = new BehaviorSubject<Manufacturer>(Manufacturer.empty());
  sharingManufacturers = this.dataSourceManufacturers.asObservable();
  sharingManufacturer = this.dataSourceManufacturer.asObservable();

  shareManufacturers(manufacturers: Manufacturer[]) {
    this.dataSourceManufacturers.next(manufacturers);
  }

  shareManufacturer(manufacturer: Manufacturer) {
    this.dataSourceManufacturer.next(manufacturer);
  }

  getAllNotDecorated(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.baseUrl + 'getAllNotDecorated');
  }

  getDecoratedManufacturer(manufacturerId: bigint): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(this.baseUrl + 'getDecoratedManufacturer?manufacturerId=' + manufacturerId)
      .pipe(
        map((manufacturerJson: any) => manufacturerJson ? Manufacturer.fromJson(manufacturerJson) : Manufacturer.empty())
      );
  }

  saveManufacturer(manufacturer: Manufacturer): Observable<Manufacturer[]> {
    return this.http.post<Manufacturer[]>(this.baseUrl + 'save', manufacturer);
  }

  deleteManufacturer(manufacturer: Manufacturer): Observable<Manufacturer[]> {
    return this.http.post<Manufacturer[]>(this.baseUrl + 'delete', manufacturer);
  }
}
