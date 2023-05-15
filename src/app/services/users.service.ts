import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<any>{
    return this.http.get('https://apiurbanova.baso.com.mx/api/users');
  }
  crearUsuario(user: any): Observable<any>{
    return this.http.post('https://apiurbanova.baso.com.mx/api/register', user);
  }
  actualizarUsuario(user: any):Observable<any>{
    const url = `https://apiurbanova.baso.com.mx/api/users/${user.id}`
    return this.http.patch(url, {name: user.name, email: user.email});
  }
  //Este método inhabilita al usuario no lo elimina permanentemente//
  eliminarUsuario(id: number): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/users/delete/${id}`);
  }
  activarUsuario(id: number): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/users/activate/${id}`);
  }
  
  obtenerUsuarioPorId(id: string): Observable<any>{
    return this.http.get(`https://apiurbanova.baso.com.mx/api/api/users/${id}`);
  }

  asignarRol(idUsuario: number,idRol: number):Observable<any>{
    const url = `https://apiurbanova.baso.com.mx/api/roles/user/attach`;
    return this.http.post(url, {user_id: idUsuario, role_id: idRol});
  }

  modificarContraseña(idUsuario: number, password: any){
    return this.http.post(`https://apiurbanova.baso.com.mx/api/users/password/${idUsuario}`, password);
  }

}
