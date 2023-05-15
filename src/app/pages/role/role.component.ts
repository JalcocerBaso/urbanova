import { Component, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { RoleService } from '../../services/role.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private roleServices: RoleService,
    private fb: FormBuilder,
    private modalServices: NgbModal,
    private usuarioService: UsersService){}

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
  asignarRolForm: any;
  dataUsuarios: User[] = [];
  submittedAsignarRol: boolean = false;

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
    
    this.roleServices.crearRol(roles).subscribe(response =>{
      if(response.success){
        location.reload();
      }
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
    const idRol = this.updateForm.value.idRol;
    const rol = {code: this.updateForm.value.codeUpdate, descripcion: this.updateForm.value.descripcionUpdate};
    this.roleServices.actualizarRol(idRol,rol).subscribe(response => {
      if(response.success){
        location.reload();
      }
    }, error => {
      console.log(error);
    }
    );
  }

  modalAsignarRolUsuario(template: TemplateRef<any>){
    this.submittedAsignarRol = false;
    this.usuarioService.obtenerUsuarios().subscribe(response => {
      this.dataUsuarios = response.data;
    });
    this.asignarRolForm = this.fb.group({
      usuarios: [null, Validators.required],
      rolUsuario: [null],
      roles: [null, Validators.required]
    });
    this.asignarRolForm.get('usuarios').setValue(null);
    
    this.asignarRolForm.get("usuarios")?.valueChanges.subscribe((value: any) =>{
      this.asignarRolForm.controls["rolUsuario"].setValue(value.role);
    });
    this.asignarRolForm.get("roles")?.valueChanges.subscribe((value: any) =>{
      console.log(value.id);
    })
    this.asignarRolForm.controls['rolUsuario'].disable();
    this.modalServices.open(template, {centered: true, size: "lg"});
  }

  asignarRolUsuario(){
    this.submittedAsignarRol = true;

    if(this.asignarRolForm.value.usuarios == "null"){
      this.asignarRolForm.controls["usuarios"].setErrors({require: true });
    }
    if(this.asignarRolForm.value.roles == "null"){
      this.asignarRolForm.controls["roles"].setErrors({require: true });
    }
    if (this.asignarRolForm.invalid) {
      return;
    }else{
      const role = {user_id: this.asignarRolForm.value.usuarios.id, role_id: this.asignarRolForm.value.roles.id};
      this.roleServices.asignarRolaUsuario(role).subscribe(response => {
        if(response.success){
          location.reload();
        }
      });
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get updateControl(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  get controlsAsignarRol(): { [key: string]: AbstractControl } {
    return this.asignarRolForm.controls;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next;
    
  }
}
