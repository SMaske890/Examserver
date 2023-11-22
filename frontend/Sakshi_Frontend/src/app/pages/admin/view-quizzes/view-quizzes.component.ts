import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = [];

  constructor(private quiz: QuizService) { }
  ngOnInit(): void {
    this.quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    });
  }

  deleteQuiz(qid: any) {
        Swal.fire({
          icon: 'info',
          title: "Are you sure?",
          confirmButtonText: 'Yes',
          showCancelButton: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.quiz.deleteQuizz(qid).subscribe({
              next: (data: any) => {
                this.quizzes.filter((quiz: any) => quiz.qid != qid);
                Swal.fire("Success", "Quiz deleted", 'success');
                this.ngOnInit();
              },
              error: (error: any) => {
                console.log(error);
                Swal.fire("Error", "Server Error", 'error');
              }
            });
          }
    
        })
      }
    }
    