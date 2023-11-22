import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'app/service/category.service';
import { QuizService } from 'app/service/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories: any = [];
  quiz: any = {
    title: '',
    description: '',
    numberOfQuestions:'',
    maxMarks:'',
    active:true,
    category:{
      cid:''
    },
  };

  constructor(private router:Router, private quizSer:QuizService, private category:CategoryService, private snack:MatSnackBar){}
  ngOnInit(): void {
    this.category.categories().subscribe({
      next:(data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      error:(error:any)=>{
        console.log(error);
        Swal.fire('Error','Error in loading data','error');
      }
    });
  }


  addQuiz(){
    if(this.quiz.title.trim()==''||this.quiz.title.trim()==null){
      this.snack.open('Data Required!!','OK');
      return;
    }

    this.quizSer.addQuiz(this.quiz).subscribe({
      next:(data:any)=>{
        Swal.fire('Success','Quiz is added','success');
        this.router.navigate(['/admin/quizzes'])
      },
      error:(error)=>{
        console.log(error);
        Swal.fire('error','Error occured while adding quiz','error');
      }
    }); 
  }
}
