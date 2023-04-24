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
  
  dtOptions: DataTables.Settings = {};
  public dtConstruccions: constructions[] = [];
  dtTrigger: Subject<any> = new Subject();
  submitted = false;
  constructions: any[] = [];
  updateForm: any;
  dtCompanies: any[] = [];
  
  registerForm = this.fb.group({
    company: ['', Validators.required],
    codigo: ['', Validators.required],
    link: ['', Validators.required],
    fuente: ['', Validators.required]
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
    this.companiesService.obtenerEmpresas().subscribe(response => {
      this.dtCompanies = response.data;
      console.log(response.data);
    });
    this.registerForm.controls["company"].setValue("null");
    this.registerForm.get("company")?.valueChanges.subscribe(f =>{
      this.onCompanyChanged(f);
    });
    this.modalService.open(template);
  }

  guardarNuevaConstruccion(){
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    } else{
      console.log(JSON.stringify(this.registerForm.value));
      this.registerForm.reset();
    }

  }
  onCompanyChanged(value: any) {
    console.log('onCountryChanged')
    console.log(value)
  }

  modalEditar(template: TemplateRef<any>, idCompany: number){
    this.companiesService.obtenerEmpresas().subscribe(response => {
      this.dtCompanies = response.data;
    });
    this.updateForm = this.fb.group({
      idConstruction: [''],
      companyUpdate: [''],
      nombreUpdate: ['', Validators.required],
      codigoUpdate: ['', Validators.required],
      linkUpdate: ['', Validators.required]
    });
    this.constructionService.obtenerContruccionPorId(idCompany).subscribe(response => {
      console.log(response);
      this.updateForm.controls['idConstruction'].setValue(response.data.id);
      this.updateForm.controls['nombreUpdate'].setValue(response.data.nombre);
      this.updateForm.controls['codigoUpdate'].setValue(response.data.codigo);
      this.updateForm.controls['linkUpdate'].setValue(response.data.link);
      this.updateForm.get('companyUpdate').setValue(response.data.empresa_id);
    });
    this.modalService.open(template);
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
}


