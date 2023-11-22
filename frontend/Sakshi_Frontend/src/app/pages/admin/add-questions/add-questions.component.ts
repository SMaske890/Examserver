import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'app/service/question.service';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;
  qId: any;
  qTitle: any;
  ques: any = {
    quiz: {
      qid:''
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(private _route: ActivatedRoute, private _queSer: QuestionService, private router:Router, private snack: MatSnackBar) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.ques.quiz['qid'] = this.qId;
    console.log(this.ques);
    

  }

  add(){
    if(this.ques.content.trim()==''||this.ques.content.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }
    
    if(this.ques.option1.trim()==''||this.ques.option1.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }
    
    if(this.ques.option2.trim()==''||this.ques.option2.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }
    
    if(this.ques.answer.trim()==''||this.ques.answer.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }

    this._queSer.addQue(this.ques).subscribe({
      next:(data:any)=>{
        console.log("Hi");
        
        Swal.fire('Success','Quiz is added','success');
        // this.router.navigate(['/admin/view-ques/qId/qTitle']);
        this.router.navigate(['/admin/view-ques' ,this.qId , this.qTitle ]);
      },
      error:(error)=>{
        console.log(error);
        Swal.fire('error','Error occured while adding quiz','error');
      }
    });
  }

}
