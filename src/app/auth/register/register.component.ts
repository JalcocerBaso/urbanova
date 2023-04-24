import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
    private loginServices: LoginService,
    private router: Router){}
  submitted = false;
  registerForm = this.fb.group({
    userName: ['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    confirmPassword: ['', Validators.required]
  },
  {
    validator: [Validation.match('password', 'confirmPassword')]
  }
  );

  onRegister(){
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const users = {name: this.registerForm.value.userName, password: this.registerForm.value.password, password_confirmation: this.registerForm.value.confirmPassword, email: this.registerForm.value.email }

    this.loginServices.register(users).subscribe(data => {
      console.log(data);
      this.router.navigate(['login']);
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
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
