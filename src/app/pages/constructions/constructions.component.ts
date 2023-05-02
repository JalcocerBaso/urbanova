import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConstructionsService } from 'src/app/services/constructions.service';
import { constructions } from '../../models/constructions'
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-constructions',
  templateUrl: './constructions.component.html',
  styleUrls: ['./constructions.component.css']
})
export class ConstructionsComponent implements OnInit, AfterViewInit, OnDestroy{
  
  constructor(private modalService: NgbModal,
              private constructionService: ConstructionsService,
              private fb: FormBuilder,
              private companiesService: CompaniesService
    ){
    }
  idConstruction: number = 0;
  estatus: string = "";
  dtOptions: DataTables.Settings = {};
  public dtConstruccions: constructions[] = [];
  dtTrigger: Subject<any> = new Subject();
  submitted = false;
  constructions: any[] = [];
  updateForm: any;
  dtCompanies: any[] = [];
  submittedUpdate = false;
  mensajeActivarDesactivar: string = "";
  textoBotonActivarDes: string = "";
  
  registerForm = this.fb.group({
    nombre: ['', Validators.required],
    company: ['', Validators.required],
    codigo: ['', Validators.required],
    link: [''],
    fuente: ['']
  });

  ngOnInit(): void {
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
    this.constructionService.obtenerConstrucciones().subscribe(response => {
      this.dtConstruccions = response.data;
      this.dtTrigger.next(null);
    });
   
  }
  
  modalNuevaConstructora(template: TemplateRef<any>){
    this.registerForm.reset();
    this.submitted = false;
    this.companiesService.obtenerEmpresas().subscribe(response => {
      this.dtCompanies = response.data;
    });
    this.registerForm.controls["company"].setValue("null");
    this.registerForm.get("company")?.valueChanges.subscribe(f =>{
      this.onCompanyChanged(f);
    });
    this.modalService.open(template);
  }

  guardarNuevaConstruccion(){
    this.submitted = true;
    if(this.registerForm.value.company == "null"){
      this.registerForm.controls["company"].setErrors({require: true });
    }
    if (this.registerForm.invalid) {
      return;
    } else{
      const construction = {empresa_id: this.registerForm.value.company,
        Nombre: this.registerForm.value.nombre,
        codigo: this.registerForm.value.codigo,
        link: this.registerForm.value.link,
        sources: ''}
      this.constructionService.agregarConstruccion(construction).subscribe(respone => {
        this.modalService.dismissAll();
        this.registerForm.reset();
        location.reload();
      });
    }
  }
  

  modalEditar(template: TemplateRef<any>, idCompany: number){
    this.companiesService.obtenerEmpresas().subscribe(response => {
      this.dtCompanies = response.data;
    });
    this.updateForm = this.fb.group({
      idConstruction: [''],
      companyUpdate: ['', Validators.required],
      nombreUpdate: ['', Validators.required],
      codigoUpdate: ['', Validators.required],
      linkUpdate: [''],
    });
    this.constructionService.obtenerContruccionPorId(idCompany).subscribe(response => {
      
      this.updateForm.controls['idConstruction'].setValue(response.data.id);
      this.updateForm.controls['nombreUpdate'].setValue(response.data.nombre);
      this.updateForm.controls['codigoUpdate'].setValue(response.data.codigo);
      this.updateForm.controls['linkUpdate'].setValue(response.data.link);
      this.updateForm.get('companyUpdate').setValue(response.data.empresa_id);
    });
    this.updateForm.get("companyUpdate")?.valueChanges.subscribe((f: any) =>{
      this.onCompanyChanged(f);
    });
    this.modalService.open(template);
  }

  modificarConstructora(){
    this.submittedUpdate = true;
    if(this.updateForm.value.companyUpdate == "null"){
      this.updateForm.controls["companyUpdate"].setErrors({require: true });
    }
    if (this.updateForm.invalid) {
      return;
    } else{
      const updateConstruction = {
        empresa_id: Number(this.updateForm.value.companyUpdate),
        Nombre: this.updateForm.value.nombreUpdate,
      codigo: this.updateForm.value.codigoUpdate,
      link: this.updateForm.value.linkUpdate,
      sources: ""
      }
      const idConstruction = this.updateForm.value.idConstruction;
      this.constructionService.actualizarConstruccion(idConstruction, updateConstruction).subscribe(response =>{
        
        if(response.success == true){
          this.modalService.dismissAll();
          location.reload();
          this.updateForm.reset();
        }
      }, error => {
        console.log(error);
      }
      );
      
    }
  }

  modalActivarDesactivar(template: TemplateRef<any>, constructor: any){
    this.idConstruction = constructor.id;
    this.estatus = constructor.status;
    console.log(this.idConstruction);
    this.modalService.open(template, { centered: true});
    if(constructor.status == "1"){     
      this.mensajeActivarDesactivar = `¿Desea desactivar la constructora ${constructor.nombre}?`;
      this.textoBotonActivarDes = "Desactivar"
    }else{
      this.mensajeActivarDesactivar = `¿Desea reactivar la constructora ${constructor.nombre}?`;
      this.textoBotonActivarDes = "Activar"
    }

  }

  eliminarConstruccion(){
    const id = this.idConstruction;
    if(this.estatus == "1"){
      this.constructionService.eliminarConstruccion(id).subscribe(response => {
        location.reload();
      });
    }else{
      this.constructionService.activarConstruccion(id).subscribe(response => {
        location.reload();
      });
    }
    
  }
 
  onCompanyChanged(value: any) {
    console.log(value)
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get constrolsUpdate(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
}


