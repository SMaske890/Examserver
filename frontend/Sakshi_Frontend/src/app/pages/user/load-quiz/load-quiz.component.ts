import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId: any;
  // qId:any;
  quizAll: any;
  constructor(private _route: ActivatedRoute, private quizService: QuizService) { }
  ngOnInit() {
    // this.qId=this._route.snapshot.params['qid'];

    // whenever there will be change in the route, this below function will
    // get executed and params will have new value
    this._route.params.subscribe((params) => {
      this.catId = params['catId'];

      // console.log(this.catId);
      if (this.catId == 0) {
        console.log("Load all quizzes");
        this.quizService.getActiveQuizzes().subscribe({
          next: (data: any) => {
            console.log(data);
            this.quizAll = data;
          },
          error: (error: any) => {
            console.log(error);
            Swal.fire("Error", "Error is loading categories",'error');
          }
        });
      }
      else {
        console.log("Load specific quiz");
        // this.quizzes = [];
        this.quizService.getActiveQuizzesOfCategory(this.catId).subscribe({
          next: (data: any) => {
            this.quizAll = data;
          },
          error: (error: any) => {
            alert("Error in loading quiz");
          }
        });
      }
    })
  }
}
