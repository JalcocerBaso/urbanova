import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
//import { HttpClientModule } from '@angular/common/http';
import { DocumentsComponent } from './documents/documents.component';
import { UsersComponent } from './users/users.component';
import { DataTablesModule } from 'angular-datatables';
import { ConstructionsComponent } from './constructions/constructions.component';
import { CompaniesComponent } from './companies/companies.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { ArchivosComponent } from './archivos/archivos.component';
import { SafePipe } from '../safe.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    DocumentsComponent,
    UsersComponent,
    ConstructionsComponent,
    CompaniesComponent,
    RoleComponent,
    ArchivosComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    
    DataTablesModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    DocumentsComponent,
    UsersComponent,
    ConstructionsComponent,
    CompaniesComponent,
    RoleComponent,
    ArchivosComponent
  ]
})
export class PagesModule { }
