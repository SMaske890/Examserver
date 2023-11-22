import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId: any;
  ques: any;

  marksGot: any = 0;
  correctAns: any = 0;
  attempted: any = 0;
  isSubmit = false;
  timer: any;

  constructor(private _ques: QuestionService, private _locationSt: LocationStrategy, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions() {
    this._ques.getQuesOfQuizForTest(this.qId).subscribe({
      next: (data: any) => {
        this.ques = data;
        // console.log(data);
        this.timer = this.ques.length * 2 * 60;
        console.log(this.ques);

        this.startTimer();
      },
      error: (error: any) => {
        console.log(error);
        Swal.fire("Error", 'Error in loading data', 'error');


      }
    });
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this._locationSt.onPopState(() => {
      history.pushState(null, location.href)
    })

  }

  submitQuiz() {
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
      // console.log("Correct Answers : " + this.correctAns);
      // console.log("Marks Got : " + this.marksGot);
      // console.log("Attempted : " + this.attempted);

    });

  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let min = Math.floor(this.timer / 60);
    let sec = this.timer - min * 60;
    return `${min} min : ${sec} sec`;
  }

  evalQuiz() {

    //call server to check answers
    this._ques.evalQuiz(this.ques).subscribe({
      next: (data: any) => {
        this.isSubmit = true;
        console.log(data);

        this.marksGot = Number(data.marksGot).toFixed(2);
        this.correctAns = data.correctAns;
        this.attempted = data.attempted;



      },
      error: (error: any) => {
        console.log(error);

      }
    })

  }

  printPage() {
    window.print();
  }
}