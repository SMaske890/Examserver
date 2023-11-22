import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'app/service/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  cat: any = [];
  constructor(private _cat: CategoryService, private _snack: MatSnackBar) { }
  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        // console.log(data);

        this.cat = data;
      },
      error: (error: any) => {
        console.log(error);
        this._snack.open('Error in loading categories', 'OK');

      }
    });
  }

}
