import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  category: any = {
    title: '',
    description: '',
  };


  constructor(private _category: CategoryService, private snack: MatSnackBar, private router: Router) { }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title.trim() == null) {
      this.snack.open("Data required", 'OK');
      return;
    }

    this._category.addCategory(this.category).subscribe({
      next: (data: any) => {
        Swal.fire('Success', 'Category added successfully', 'success');
        this.router.navigate(['/admin/categories'])
      },
      error: (error) =>{
        console.log(error);
        Swal.fire('Error', 'Server Error', 'error');    
      }
    });
  }

}
