import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private roleServices: RoleService,
    private fb: FormBuilder,
    private  modalServices: NgbModal){}

  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  public dataRol: any[] = [];
  submitted: boolean = false;
  registerForm = this.fb.group({
    code: ['', Validators.required],
    descripcion: ['', Validators.required]
  });
  updateForm: any;
  submittedUpdate: boolean = false;

  ngOnInit(): void {
    this.roleServices.obtenerRoles().subscribe(data =>{
      this.dataRol = data.data;
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

  modalNuevoRol(template: TemplateRef<any>){
    this.submitted = false;
    this.registerForm.reset();
    this.modalServices.open(template);
  }

  guardrNuevoRol(){
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }
    const roles = {code: this.registerForm.value.code, descripcion: this.registerForm.value.descripcion};
    console.log(roles);
    this.roleServices.crearRol(roles).subscribe(response =>{
      console.log(response);
    });
  }

  modalEditarRol(template: TemplateRef<any>, role: any){
    
    this.updateForm = this.fb.group({
      idRol: [role.id],
      codeUpdate: [role.code, Validators.required],
      descripcionUpdate: [role.descripcion, Validators.required]
    });
    this.modalServices.open(template);
  }

  modificarRol(){
    this.submittedUpdate = true;
    
    if (this.updateForm.invalid) {
      return;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get updateControl(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next;
    
  }
}
