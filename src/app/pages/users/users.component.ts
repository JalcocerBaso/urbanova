import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/Users';
import { Subject } from 'rxjs';
import { RoleService } from 'src/app/services/role.service';
import { CompaniesService } from '../../services/companies.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  
  nombre: string = "";
  submitted = false;
  submittedUpdate = false;
  submittedSelectCompany = false;
  dtTrigger: Subject<any> = new Subject();
  usersModel = new User();
  loading: boolean = false;
  mensajeActivarDesactivarUsuario: string = '';
  textoBotonActivarDes: string = '';
  updateForm: any;
  public dataUser: User[] = [];
  dataRoles: any[] = [];
  selected:any;
  filtered :any;
  validateRol: boolean;
  selectRolDisable: boolean = false;
  dtCompanies: any[] = [];
  asignarEmpresaForm: any;
  validateCopany: boolean = false;
  modificarPasswordForm: any;
  submittedNewPassword = false;

  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private userService: UsersService,
    private roleServices: RoleService,
    private companiesServices: CompaniesService){
      this.validateRol = false;
    }

    registerForm = this.fb.group({
      userName: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: [Validation.match('password', 'confirmPassword')]}
    );
    
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe(data => {
      this.dataUser = data.data;
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
  
  mostrarModalNuevo(template: TemplateRef<any>){
    this.registerForm.reset();
    this.submitted = false;
    this.registerForm.setErrors(null)
    this.modalService.open(template);
  }
  guardarUsuario(){
    this.submitted = true;
    this.loading = true;
    if (this.registerForm.invalid) {
      return;
    }
    const users = {name: this.registerForm.value.userName, password: this.registerForm.value.password, password_confirmation: this.registerForm.value.confirmPassword, email: this.registerForm.value.email }
    this.modalService.dismissAll();
    // setTimeout(() => 
    // {
    //     console.log('Pasaron 10 segundos');
    //     this.loading = false;
    // },
    // 10000);
    
    this.userService.crearUsuario(users).subscribe(data => {
      this.loading = false;
      location.reload();
    });
  }

  mostrarModalEditar(template: TemplateRef<any>, usuario: any){
    this.submittedUpdate = false;
    this.usersModel.id = usuario.id;
    this.usersModel.name = usuario.name;
    this.usersModel.email = usuario.email;
    this.usersModel.status = usuario.status;
    //Formulario de actualizar
    this.updateForm = this.fb.group({
      nameUpdate: [this.usersModel.name, Validators.required],
      email: [this.usersModel.email, [Validators.required, Validators.email]],
    });
    if(usuario.status != '1'){
      this.updateForm.controls['nameUpdate'].disable();
      this.updateForm.controls['email'].disable();
    }
    this.modalService.open(template);
  }

  ModificarUsuario(){
    this.submittedUpdate = true;
    this.loading = true;
    if (this.updateForm.invalid) {
      return;
    }
    const updateUser = {id: this.usersModel.id ,name: this.updateForm.value.nameUpdate, email: this.updateForm.value.email};
    this.userService.actualizarUsuario(updateUser).subscribe(data =>{
      if(data.success){
        this.loading = false;
        location.reload();
      }
    }, error => {
      console.log(error)
    });
  }
  mostrarModalEliminar(template: TemplateRef<any>, nombreUsuario: string){
    this.modalService.open(template, { centered:true });
    this.nombre = nombreUsuario;
  }

  mostrarModalActivarUsuario(template: TemplateRef<any>, usuarios: User){
    this.modalService.open(template, {centered: true })
    this.usersModel.id = usuarios.id;
    this.usersModel.status = usuarios.status;
    if(usuarios.status == "1"){     
      this.mensajeActivarDesactivarUsuario = `¿Desea desactivar al usuario ${usuarios.name}?`;
      this.textoBotonActivarDes = "Desactivar"
    }else{
      this.mensajeActivarDesactivarUsuario = `¿Desea reactivar al ${usuarios.name}?`;
      this.textoBotonActivarDes = "Activar"
    }
  }

  ActivarDesactivarUsuario(){
    const status = this.usersModel.status;
    this.loading = true;
    const id = this.usersModel.id;
    if(status == "1"){
      this.userService.eliminarUsuario(id).subscribe(data => {  
        this.loading = false;
        location.reload();  
      });
    }else{
      this.userService.activarUsuario(id).subscribe(data => {
        this.loading = false;
        location.reload();
      });
    }
  }

  mostrarModalAsignarRol(template: TemplateRef<any>, id: number, status: string){
    this.modalService.open(template, {centered: true });
    this.validateRol = false;
    this.usersModel.id = id;
    status != '1' ? this.selectRolDisable = true : this.selectRolDisable = false;
    this.selected = null;
    this.roleServices.obtenerRoles().subscribe(data => {
      this.dataRoles = data.data;
    });
  }
  changeRoles(){
    //console.log(this.selected);
    this.filtered = this.dataRoles.filter(t => t.code == this.selected);
  }

  cambiarRole(){
    this.loading = true;
    if(this.selected == null || undefined){
      this.loading = false;
      this.validateRol = true;
    }else{
      const idUsuario = this.usersModel.id;
      const idRol = this.selected.id;
      this.modalService.dismissAll();
      this.userService.asignarRol(idUsuario, idRol).subscribe(data => {
        if(data.success == true){
          this.loading = false;
          location.reload();
        }
      }, error =>{
        console.log(error);
        this.loading = false;
      });
    }
  }

  mostrarModalAsignarEmpresa(template: TemplateRef<any>, users: any){
    this.validateCopany = false;
    this.usersModel.id = users.id;
    const status = users.status;
    this.asignarEmpresaForm = this.fb.group({
      company: ['', Validators.required]
    });
    this.companiesServices.obtenerEmpresas().subscribe( response =>{
      this.dtCompanies = response.data;
    });
    this.asignarEmpresaForm.controls["company"].setValue("null");
    this.asignarEmpresaForm.get("company")?.valueChanges.subscribe((f: any) =>{
      this.onCompanyChanged(f);
    });
    if(status != '1'){
      this.asignarEmpresaForm.controls['company'].disable();
    }
    this.modalService.open(template, { centered: true });
  }

  asignarEmpresa(){
    this.submittedSelectCompany = true;
    if(this.asignarEmpresaForm.value.company == "null"){
      this.asignarEmpresaForm.controls["company"].setErrors({require: true });
    }
    if (this.asignarEmpresaForm.invalid) {
      return;
    }else{
      const idCompany = this.asignarEmpresaForm.value.company;
      const req = {user_id: this.usersModel.id, empresa_id: idCompany}
      this.companiesServices.asignarUsuario(req).subscribe(response => {
        if(response.success == true){
          location.reload()
        }
      }, error => {
        console.log(error);
        this.validateCopany = true;
      });
    }
  }

  mostrarModalCambiarPassword(template: TemplateRef<any>, idUsuario: number){
    this.submittedNewPassword = false;
    this.modificarPasswordForm = this.fb.group({
      id: [''],
      newPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmNewPassword: ['', Validators.required]
    },
    {
      validator: [Validation.match('newPassword', 'confirmNewPassword')]
    });
    this.modificarPasswordForm.get('id').setValue(idUsuario)
    this.modalService.open(template);
  }

  modificarPassword(){
    this.submittedNewPassword = true;
    this.loading = true;
    if (this.modificarPasswordForm.invalid) {
      return;
    }
    const newPassword = {password: this.modificarPasswordForm.value.newPassword};
    const idUsuario = this.modificarPasswordForm.value.id;
    console.log(newPassword);
    this.modalService.dismissAll();
    this.userService.modificarContraseña(idUsuario,newPassword).subscribe(response =>{
      this.loading = false;
      console.log(response);
    });
  }
  onCompanyChanged(value: any) {
    console.log(value)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get getControl(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }

  get getSelectCompany(): { [key: string]: AbstractControl } {
    return this.asignarEmpresaForm.controls;
  }

  get getControlNewPassword(): { [key: string]: AbstractControl } {
    return this.modificarPasswordForm.controls;
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }
  
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}