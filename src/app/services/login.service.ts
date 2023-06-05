import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/Users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  constructor(private http: HttpClient) { }
  url: string = "https://apiurbanovadev.baso.com.mx";

  login(user: any): Observable<any>{
    return this.http.post(this.url +'/api/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post(this.url + "/api/register", user);
  }

  getUserLogedIn() : Observable<any>{
    // const headers = new HttpHeaders().append('Content-Type', 'application/json').
    // append('Authorization', `Bearer ${token}`);
    return this.http.get(this.url +"/api/users");
  }
  logout(): Observable<any>{
    return this.http.post(this.url +"/api/logout", {});
  }
}
