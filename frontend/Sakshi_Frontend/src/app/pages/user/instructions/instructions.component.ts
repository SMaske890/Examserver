import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any;
  constructor(private _route: ActivatedRoute, private _quizSer: QuizService, private router:Router){}
  ngOnInit(): void {
    this.qId= this._route.snapshot.params['qid']

    this._quizSer.getQuiz(this.qId).subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.quiz=data;
        
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Erroe in loading data','error');
        
      }
    });

  }

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start/'+this.qId])
      } 
    });
  }

}
