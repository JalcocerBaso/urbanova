import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from '../guard/authguard.guard';
import { DocumentsComponent } from './documents/documents.component';
import { UsersComponent } from './users/users.component';
import { ConstructionsComponent } from './constructions/constructions.component';
import { CompaniesComponent } from './companies/companies.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: 'dashboard', canActivate: [AuthguardGuard], component: PagesComponent, 
    children:[
      {path: '', component: DashboardComponent, canActivate: [AuthguardGuard], data: {titulo:'Inicio'}},
      {path: 'documents', component: DocumentsComponent, canActivate: [AuthguardGuard], data: {titulo:'Documentos'} },
      {path: 'users', component: UsersComponent, canActivate: [AuthguardGuard], data: {titulo: 'Usuarios'} },
      {path: 'constructions', component: ConstructionsComponent, canActivate: [AuthguardGuard], data: {titulo: 'Constructoras'} },
      {path: 'companies', component: CompaniesComponent, canActivate: [AuthguardGuard], data: {titulo: 'Empresas'} },
      {path: 'roles', component: RoleComponent, canActivate: [AuthguardGuard], data: {titulo: 'Roles'} }
    ]
  }
]


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
