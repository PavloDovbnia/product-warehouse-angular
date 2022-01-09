import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductStockData} from "./product-stock-data";

@Injectable({
  providedIn: 'root'
})
export class ProductsStockDataService {

  private baseUrl = 'http://localhost:8080/api/stock/';

  constructor(private http: HttpClient) {
  }

  // private dataSourceProductsStockData = new BehaviorSubject<ProductStockData[]>(new Array<ProductStockData>());
  // private dataSourceProductStockData = new BehaviorSubject<ProductStockData>(ProductStockData.empty());
  // sharingProductsStockData = this.dataSourceProductsStockData.asObservable();
  // sharingProductStockData = this.dataSourceProductStockData.asObservable();
  //
  // shareProductsStockData(productsStockData: ProductStockData[]) {
  //   this.dataSourceProductsStockData.next(productsStockData);
  // }
  //
  // shareProductStockData(productStockData: ProductStockData) {
  //   this.dataSourceProductStockData.next(productStockData);
  // }

  getValues(): Observable<ProductStockData[]> {
    return this.http.get<ProductStockData[]>(this.baseUrl + 'getValues');
  }
}
