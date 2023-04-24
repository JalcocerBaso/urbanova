import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConstructionsService {

  constructor(private http: HttpClient) { }

  obtenerConstrucciones():Observable<any>{
    return this.http.get('https://apiurbanova.baso.com.mx/api/contrucciones');
  }

  agregarConstruccion(construction: any):Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/contrucciones',{
      empresa_id: construction.id,
      codigo: construction.codigo,
      link: construction.link,
      sources: construction.sources
    });
  }

  obtenerContruccionPorId(id: number): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/contrucciones/${id}`);
  }

  actualizarConstruccion(id: number,construction: any): Observable<any>{
    return this.http.patch(`https://apiurbanova.baso.com.mx/api/contrucciones/${id}`,{
      empresa_id: construction.id,
      codigo: construction.codigo,
      link: construction.link,
      sources: construction.sources
    });
  }
  //No lo elimina lo descativa
  eliminarConstruccion(id: number): Observable<any>{
    return this.http.delete(`https://apiurbanova.baso.com.mx/api/contrucciones/${id}`);
  }
  activarConstruccion(id: number): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/contrucciones/activate/${id}`);
  }
}
