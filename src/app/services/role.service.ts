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

  crearRol(rol: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/roles', rol);
  }

  obtenerRolPorId(id: number): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/roles/${id}`);
  }

  eliminarRol(id: number): Observable<any>{
    return this.http.delete(`https://apiurbanova.baso.com.mx/api/roles/${id}`);
  }

  actualizarRol(id: number, rol: any): Observable<any>{
    return this.http.patch(`https://apiurbanova.baso.com.mx/api/roles/${id}`,
    {
      code: rol.code,
      descripcion: rol.descripcion
    });
  }

  asignarRolaUsuario(rol: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/roles/user/attach', rol);
  }
}
