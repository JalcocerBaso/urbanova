import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConstructionsService {

  constructor(private http: HttpClient) { }
  url: string = "https://apiurbanovadev.baso.com.mx";

  obtenerConstrucciones():Observable<any>{
    return this.http.get(this.url + '/api/contrucciones');
  }

  agregarConstruccion(construction: any):Observable<any>{
    return this.http.post(this.url + '/api/contrucciones',{
      empresa_id: construction.empresa_id,
      Nombre: construction.Nombre,
      codigo: construction.codigo,
      link: construction.link,
      sources: construction.sources
    });
  }

  obtenerContruccionPorId(id: number): Observable<any>{
    return this.http.get(`${this.url}/api/contrucciones/${id}`);
  }

  actualizarConstruccion(id: number,construction: any): Observable<any>{
    return this.http.patch(`${this.url}/api/contrucciones/${id}`,{
      empresa_id: construction.empresa_id,
      Nombre: construction.Nombre,
      codigo: construction.codigo,
      link: construction.link,
      sources: construction.sources
    });
  }
  //No lo elimina lo descativa
  eliminarConstruccion(id: number): Observable<any>{
    return this.http.delete(`${this.url}/api/contrucciones/${id}`);
  }
  
  activarConstruccion(id: number): Observable<any>{
    return this.http.get(`${this.url}/api/contrucciones/activate/${id}`);
  }

  ObtenerArchivosPorConstructora(idConstructor: number): Observable<any>{
    return this.http.get(`${this.url}/api/contrucciones/archivos/${idConstructor}`);
  }
}
