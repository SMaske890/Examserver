import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any = [];

  constructor(private category: CategoryService) { }
  ngOnInit(): void {
    this.category.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
        console.log(this.categories);

      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    });
  }

  deleteCategory(cId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      title: 'Are you sure?'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.category.deleteCategory(cId).subscribe({
          next: (data: any) => {
            this.categories = this.categories.filter((category: any) => category.cid != cId);
            Swal.fire('Success', 'Category Deleted', 'success');
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting category', 'error');
            console.log(error);
          }
        });
      }
    }
    )
  }
}
