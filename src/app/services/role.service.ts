import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  url: string = "https://apiurbanovadev.baso.com.mx";

  obtenerRoles(): Observable<any>{
    return this.http.get(this.url + '/api/roles');
  }

  crearRol(rol: any): Observable<any>{
    return this.http.post(this.url + '/api/roles', rol);
  }

  obtenerRolPorId(id: number): Observable<any>{
    return this.http.get(`${this.url}/api/roles/${id}`);
  }

  eliminarRol(id: number): Observable<any>{
    return this.http.delete(`${this.url}/api/roles/${id}`);
  }

  actualizarRol(id: number, rol: any): Observable<any>{
    return this.http.patch(`${this.url}/api/roles/${id}`,
    {
      code: rol.code,
      descripcion: rol.descripcion
    });
  }

  asignarRolaUsuario(rol: any): Observable<any>{
    return this.http.post(this.url +'/api/roles/user/attach', rol);
  }
}
