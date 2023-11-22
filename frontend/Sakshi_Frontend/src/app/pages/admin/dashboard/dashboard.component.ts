import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router: Router, private loginService: LoginService) { }
  
  logout(){
    this.loginService.logout();
    location.reload();
    this.router.navigate(['login']);

  }
}
