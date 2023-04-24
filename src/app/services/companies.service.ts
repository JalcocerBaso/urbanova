import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  obtenerEmpresas(): Observable<any>{
    return this.http.get('https://apiurbanova.baso.com.mx/api/empresas');
  }

  crearEmpresa(company: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/empresas', company);
  }

  eliminarEmpresa(idEmpresa: number): Observable<any>{
    return this.http.delete(`https://apiurbanova.baso.com.mx/api/empresas/${idEmpresa}`);
  }
  actualizarEmpresa(id: number,company: any): Observable<any>{
    return this.http.patch(`https://apiurbanova.baso.com.mx/api/empresas/${id}`, {nombre: company.nombre, descripcion: company.descripcion});
  }

  asignarUsuario(request: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/empresas/user/attach', request);
  }

  //Eliminar un usuario asignado a una empresa
  quitarUsuarioAsignado(request: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/api/empresas/user/desatach', request);
  }
}
