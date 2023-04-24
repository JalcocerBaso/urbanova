import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  @Output() lAdmin: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  public getDriveDocuments(): Observable<any>{
    const url = 'https://www.baso.com.mx/api/api_simple/files.php';
    const queryParams = new HttpParams().append("url","https://drive.google.com/drive/folders/1exmajfb8Cif03g2tNfWrnhIFbA9XDFJJ");
    return this.http.get<any>(url, { params: queryParams});
  }
}
