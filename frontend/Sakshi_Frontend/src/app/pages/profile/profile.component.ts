import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:any;

  constructor(private loginService: LoginService) { }
  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

}
