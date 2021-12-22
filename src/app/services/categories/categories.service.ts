import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Category} from "./category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = 'http://localhost:8080/api/product/category/';

  constructor(private http: HttpClient) {
  }

  private dataSourceCategories = new BehaviorSubject<Category[]>(new Array<Category>());
  private dataSourceCategory = new BehaviorSubject<Category>(new Category(BigInt(0), ''));
  sharingCategories = this.dataSourceCategories.asObservable();
  sharingCategory = this.dataSourceCategory.asObservable();

  shareCategories(categories: Category[]) {
    this.dataSourceCategories.next(categories);
  }

  shareCategory(category: Category) {
    this.dataSourceCategory.next(category);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + 'getAll');
  }

  saveCategory(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(this.baseUrl + 'save', category);
  }

  deleteCategory(category: Category): Observable<Category[]> {
    return this.http.post<Category[]>(this.baseUrl + 'delete', category);
  }
}
