import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }
  url: string = "https://apiurbanovadev.baso.com.mx";
  obtenerEmpresas(): Observable<any>{
    return this.http.get(this.url +'/api/empresas');
  }

  crearEmpresa(company: any): Observable<any>{
    return this.http.post(this.url +'/api/empresas', company);
  }

  eliminarEmpresa(idEmpresa: number): Observable<any>{
    return this.http.delete(`${this.url}/api/empresas/${idEmpresa}`);
  }
  actualizarEmpresa(id: number,company: any): Observable<any>{
    return this.http.patch(`${this.url}/api/empresas/${id}`, {nombre: company.nombre, descripcion: company.descripcion});
  }

  asignarUsuario(request: any): Observable<any>{
    return this.http.post(this.url +'/api/empresas/user/attach', request);
  }

  //Eliminar un usuario asignado a una empresa
  quitarUsuarioAsignado(request: any): Observable<any>{
    return this.http.post(this.url +'/api/api/empresas/user/desatach', request);
  }
  obtenerEmpresaPorId(idEmpresa: number): Observable<any>{
    return this.http.get(`${this.url}/api/empresas/${idEmpresa}`);
  }
}
