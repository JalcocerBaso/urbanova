import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<any>{
    return this.http.get('https://apiurbanova.baso.com.mx/api/roles');
  }
}
