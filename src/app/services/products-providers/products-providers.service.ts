import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductProvider} from "./product-provider";
import {map} from "rxjs/operators";
import {User} from "../users/user";
import {ProductProviders} from "./product-providers";

@Injectable({
  providedIn: 'root'
})
export class ProductsProvidersService {

  private baseUrl = 'http://localhost:8080/api/provider/';

  constructor(private http: HttpClient) {
  }

  private dataSourceProductProviders = new BehaviorSubject<ProductProviders>(ProductProviders.empty());
  sharingProductProviders = this.dataSourceProductProviders.asObservable();

  private dataSourceProductProvidersSaved = new BehaviorSubject<boolean>(false);
  sharingProductProvidersSaved = this.dataSourceProductProvidersSaved.asObservable();

  shareProductProviders(productProviders: ProductProviders) {
    this.dataSourceProductProviders.next(productProviders);
  }

  shareProductProvidersSaved(isSaved: boolean) {
    this.dataSourceProductProvidersSaved.next(isSaved);
  }

  getProviders() {
    return this.http.get<User[]>(this.baseUrl + 'getUserProviders');
  }

  save(productId: bigint, productProvidersIdsToAdd: bigint[], productProvidersIdsToDelete: bigint[]): Observable<ProductProvider[]> {
    const body = {
      productId: productId,
      providersIdsToAdd: productProvidersIdsToAdd,
      providersIdsToDelete: productProvidersIdsToDelete,
    };
    return this.http.post<ProductProvider[]>(this.baseUrl + 'save-product-providers', body);
  }

  getDecoratedProductsProviders(productsIds: Array<bigint>): Observable<Map<bigint, Array<ProductProvider>>> {
    if (productsIds.length > 0) {
      const httpOptions = {
        params: {
          productsIds: this.getProductsIds(productsIds),
        }
      };
      return this.http.get<Map<bigint, Array<ProductProvider>>>(this.baseUrl + 'getDecoratedProductsProviders', httpOptions)
        .pipe(
          map((productsProviders: any) => productsProviders ? this.fromJson(productsProviders) : ProductsProvidersService.emptyProductsProviders())
        );
    }
    return new BehaviorSubject<Map<bigint, Array<ProductProvider>>>(ProductsProvidersService.emptyProductsProviders()).asObservable();
  }

  private fromJson(json: any): Map<bigint, Array<ProductProvider>> {
    const productsProviders = ProductsProvidersService.emptyProductsProviders();
    const productsIds = Object.keys(json);
    productsIds.forEach(productId => {
      const productProviders = new Array<ProductProvider>();
      productsProviders.set(BigInt(productId), productProviders);

      json[productId].forEach((provider: any) => {
        provider.provider = User.fromJson(provider.provider);
        productProviders.push(ProductProvider.fromJson(provider));
      });
    });
    return productsProviders;
  }

  private static emptyProductsProviders(): Map<bigint, Array<ProductProvider>> {
    return new Map<bigint, Array<ProductProvider>>();
  }

  private getProductsIds(productsIds: Array<bigint>): string {
    let productsIdsStr = '';
    if (productsIds.length > 0) {
      productsIds.forEach(productId => {
        productsIdsStr = productsIdsStr + productId + '-';
      });
      return productsIdsStr.slice(0, -1);
    }
    return productsIdsStr;
  }
}
