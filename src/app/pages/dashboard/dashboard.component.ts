import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';

import { Archivo } from '../../models/archivos';
import { CompaniesService } from 'src/app/services/companies.service';
import { companies } from 'src/app/models/companies';
import { SendConstructionsService } from 'src/app/services/send-constructions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private docServices: DocumentsService,
    private companyServices: CompaniesService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private usersServices: UsersService){
    
  }
  inforArchivos: Array<Archivo> = [];
  public dataCompanies: companies[] = [];
  dataConstrucciones: any;
  

  total: number = 0;
  ngOnInit(): void {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if(tipoUsuario == 'ADMIN'){
      this.companyServices.obtenerEmpresas().subscribe(response =>{
        this.dataCompanies = response.data;
        this.dataConstrucciones = response.data;
      });
    }else{
      this.usersServices.obtenerUsuarios().subscribe(response =>{
        this.dataCompanies = response.data.empresa;
      });
    }
  }

  abrirDocuments(idEmpresa: number){
    this.router.navigate(['documents', idEmpresa], { relativeTo: this.activedRoute});
  }
}
