import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/Users';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router,
    private loginService: LoginService,
    ){  }
  user: User[] = [];
  username: string = '';
  tipoUsuario: string = '';
  ngOnInit(): void {
    //const token = localStorage.getItem('token');
    this.loginService.getUserLogedIn().subscribe(data => {
      this.user = data.data;
      this.username = this.user[0].name;
      this.tipoUsuario = data.message;
    });
  }

  logOut(){
    this.loginService.logout().subscribe(data => {
      if(data.status == "success"){
        localStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }

  
}

