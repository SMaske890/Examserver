import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginService } from 'app/service/login.service';
import { User } from 'app/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
  }

  public user = new User();
  public errorMessage: any = null;

  roleBasedLogin() {
    this.loginService.getCurrentUser().subscribe({
      next: (user: any) => {
        console.log(user);
        this.loginService.setUser(user);

        if (this.loginService.getUserRole() == 'ADMIN') {
          this.router.navigate(['admin']);
          this.loginService.loginStatusSubject.next(true);

        } else if (this.loginService.getUserRole() == 'NORMAL') {
          this.router.navigate(['user/0']);
          this.loginService.loginStatusSubject.next(true);

        } else {
          this.loginService.logout();
        }
      }
    });
  }


  onSubmit() {
    console.log("Login Initiated");
    console.log(this.user);

    if (this.user.uname != null && this.user.password != null) {
      console.log("Submitted Form");
      this.loginService.generateToken(this.user).subscribe({
        next:(response: any) => {
          console.log(response.jwtToken);
          this.loginService.loginUser(response.jwtToken);
          //this.router.navigate(['admin']);

          this.roleBasedLogin();
        },

        error:(error: any) => {
          console.log(error);
          this.errorMessage = error.error;
          this.snack.open("Something went wrong!!", "OK")
          //this.formData.reset();

        }
      });
    }

    else {
      console.log("Fields are empty!!");
    }
  }

 


}
