import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId: any;
  qTitle: any;
  question: any = [];
  constructor(private _route: ActivatedRoute, private _que: QuestionService) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._que.getQuesOfQuiz(this.qId).subscribe({
      next: (data: any) => {
        this.question = data;
        console.log(data);

      },
      error: (error: any) => {
        console.log(error);

      }
    });
  }

  delQue(queId: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      title: 'Are you sure?'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._que.deleteQue(queId).subscribe({
          next: (data: any) => {
            this.question = this.question.filter((question: any) => question.queId != queId);
            Swal.fire('Success', 'Question Deleted', 'success');
          },
          error: (error: any) => {
            Swal.fire('Error', 'Error in deleting question', 'error');
            console.log(error);
          }
        });
      }
    })
  }
}
