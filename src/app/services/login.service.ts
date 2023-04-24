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

  login(user: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/login', user);
  }

  register(user: any): Observable<any> {
    return this.http.post("https://apiurbanova.baso.com.mx/api/register", user);
  }

  getUserLogedIn() : Observable<any>{
    // const headers = new HttpHeaders().append('Content-Type', 'application/json').
    // append('Authorization', `Bearer ${token}`);
    return this.http.get("https://apiurbanova.baso.com.mx/api/users");
  }
  logout(): Observable<any>{
    return this.http.post("https://apiurbanova.baso.com.mx/api/logout", {});
  }
}
