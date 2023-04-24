import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/Users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  validate: boolean = true;
  users?: User;
  submitted = false;
  constructor(private router: Router,
    private activedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private loginServices: LoginService){}
  

  loginForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });
  

  submit(){
    this.submitted = true;
    const user = {email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.loginServices.login(user).subscribe(data => {
      if(data.status == "success"){
        this.validateUser(data.token);
      }
    },
    error => {
      this.validate = false;
      console.log(error);
      this.clear();
    }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  clear(){
    this.loginForm.value.email = "";
    this.loginForm.value.password = "";
  }

  validateUser(token: string){
    localStorage.clear();
    localStorage.setItem('token', token);
    this.loginServices.getUserLogedIn().subscribe(data => {
      this.router.navigate(['/dashboard'], { relativeTo: this.activedRoute });
    });
  }
}
