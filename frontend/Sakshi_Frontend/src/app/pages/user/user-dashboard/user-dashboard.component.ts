import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  constructor(private router: Router, private loginService: LoginService) { }
  
  logout(){
    this.loginService.logout();
    location.reload();
    this.router.navigate(['login']);
  }
}
