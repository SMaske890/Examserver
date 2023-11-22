import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080'
  constructor(private http: HttpClient) { }

  public addUser(user:any){
    console.log("Adding user");
    return this.http.post(`${this.url}/user/register`,user);
  }
}
