import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8080';

  public categories() {
    return this.http.get(`${this.baseUrl}/category/`, { withCredentials: true });
  }

  public addCategory(category: any) {
    return this.http.post(`${this.baseUrl}/category/`, category, { withCredentials: true });
  }

  public deleteCategory(cid: any) {
    return this.http.delete(`${this.baseUrl}/category/${cid}`, { withCredentials: true });
  }
}
