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
    // this.docServices.getDriveDocuments().subscribe(response => {
    //   //this.inforArchivos = response;
    //   console.log(this.inforArchivos);
    //   for (let index = 0; index < Object.keys(response).length; index++) {
    //     this.inforArchivos.push(response[index]);
        
    //     this.total++;
    //   }
    //   console.log(this.total);
    //   console.log(this.inforArchivos);
    // });
  }
}
