import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.css']
})
export class WelcomeAdminComponent implements OnInit {
  public user :any;

  constructor(public loginService: LoginService){}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }
  

}
