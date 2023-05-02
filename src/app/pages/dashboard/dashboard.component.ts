import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';

import { Archivo } from '../../models/archivos';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private docServices: DocumentsService){
    
  }
  inforArchivos: Array<Archivo> = [];

  total: number = 0;
  ngOnInit(): void {
    this.docServices.getDriveDocuments().subscribe(response => {
      //this.inforArchivos = response;
      console.log(response);
    });
  }
}
