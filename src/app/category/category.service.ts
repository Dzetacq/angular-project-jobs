import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { api } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string = api + "categories/";
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategoryById(id: number) : Observable<Category> {
    return this.http.get<Category>(this.url + id);
  }

  postCategory(category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Category>(this.url, category, {headers: headers});
  }

  putCategory(id:number, category: Category): Observable<Category> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Category>(this.url + id, category, {headers: headers});
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.url + id);
  }
}
