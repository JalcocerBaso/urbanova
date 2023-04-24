import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { companies } from '../../models/companies';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private companiesServices: CompaniesService,
              private fb: FormBuilder){}

  dtOptions: DataTables.Settings = {};
  public dataCompanies: companies[] = [];
  dtTrigger: Subject<any> = new Subject();
  submitted = false;
  updateForm: any;
  submittedUpdate = false;
  idEmpresaEliminar: number = 0;

  registerForm = this.fb.group({
    nombreEmpresa: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {
    this.companiesServices.obtenerEmpresas().subscribe(data => {
      if(data.success == true){
        this.dataCompanies = data.data;
      }
    });
    this.dtOptions = {
      columnDefs:[{ "targets": 0}],
      language: {
        "lengthMenu": "Mostrar _MENU_ resultados",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
        "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
        "search": "Buscar",
        "loadingRecords": "Cargando...",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      responsive: true,
    };
  }
  
  modalEmpresaNuevo(template: TemplateRef<any>){
    this.modalService.open(template);
  }

  guardarNuevaEmpresa(){
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    this.modalService.dismissAll();
    const companies = {nombre: this.registerForm.value.nombreEmpresa, descripcion: this.registerForm.value.descripcion}
    this.companiesServices.crearEmpresa(companies).subscribe(data => {
      location.reload();
    });
  }

  modalEditarEmpresa(template: TemplateRef<any>,company: any){
    this.updateForm = this.fb.group({
      nombreEmpresaUpdate: [company.nombre, Validators.required],
      descripcionUpdate:[company.descripcion],
      idEmpresa: [company.id]
    });
    if(company.status != '1'){
      this.updateForm.controls['nombreEmpresaUpdate'].disable();
      this.updateForm.controls['descripcionUpdate'].disable();
    }
    this.modalService.open(template);
  }

  modificarEmpresa(){
    this.submittedUpdate = true;
    
    if (this.updateForm.invalid) {
      return;
    }
    const companyUpdate = {nombre: this.updateForm.value.nombreEmpresaUpdate, descripcion: this.updateForm.value.descripcionUpdate}
    const idCompany = this.updateForm.value.idEmpresa;
    this.companiesServices.actualizarEmpresa(idCompany, companyUpdate).subscribe(data =>{
      if(data.success == true){        
        location.reload()
      }
    });
  }

  modalEliminarEmpresa(template: TemplateRef<any>, id: number){
    this.idEmpresaEliminar = id;
    this.modalService.open(template,{ centered: true});
  }

  eliminarEmpresa(){
    console.log(this.idEmpresaEliminar);
    let id = this.idEmpresaEliminar;
    this.companiesServices.eliminarEmpresa(id).subscribe(data => {
      if(data.success == true){
        location.reload();
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get ControlsUpdate(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }
}
