import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'app/service/category.service';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private _quiz: QuizService, private _cat: CategoryService) { }
  categories: any = [];
  qid = 0;
  quiz: any;

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    // alert(this.qid);

    this._quiz.getQuiz(this.qid).subscribe({
      next: (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      error: (error: any) => {
        console.log(error);
      }
    });


    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.log(error);

      }
    });

  }

  update() {
    this._quiz.updateQuiz(this.quiz).subscribe({
      next: (data: any) => {
        Swal.fire('Updated', 'Data updated successfully', 'success');
        this.router.navigate(['/admin/quizzes']);
      },
      error: (error: any) => {
        Swal.fire('Error', 'Error in updating data', 'error');
        console.log(error);

      }
    });
  }

}
