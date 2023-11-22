import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(private userService: UserService, private snack :MatSnackBar, private router: Router ) {}

  ngOnInit(): void {
  }
  
  onSubmit() {
    console.log(this.user);
    
    if (this.user.username == '' || this.user.username == null) {
      // alert("Username required!!");
      this.snack.open("Username is required!!", 'Ok');
      return;
    }
  


    this.userService.addUser(this.user).subscribe({
      next: (data:any)=>{
        console.log(data);
        // alert("Success!!");
        Swal.fire('Success','User is registered successfully','success');
        this.router.navigate(['login']);
        // alert("Success!!");
      },
      error: (error:any)=>{
        console.log(error);
        // alert("Something Went Wrong!!")
        this.snack.open("Something went wrong!!","OK")

      }
  });

  }
}
