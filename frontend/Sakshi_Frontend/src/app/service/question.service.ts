import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  baseUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }
//admin
  public getQuesOfQuiz(qid:any){
    return this._http.get(`${this.baseUrl}/question/quiz/all/${qid}`)

  }
  //normal
  public getQuesOfQuizForTest(qid:any){
    return this._http.get(`${this.baseUrl}/question/quiz/${qid}`)

  }
  
  public addQue(questionn:any){
    // console.log("Add");
    
    return this._http.post(`${this.baseUrl}/question/`, questionn, { withCredentials: true });

  }

  public deleteQue(queId:any){
    return this._http.delete(`${this.baseUrl}/question/${queId}`);
  }

  public evalQuiz(questions:any){
    return this._http.post(`${this.baseUrl}/question/eval-quiz`,questions);
  }

  
}
