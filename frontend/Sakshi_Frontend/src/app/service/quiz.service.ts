import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  baseUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  public quizzes(){
    return this.http.get(`${this.baseUrl}/quiz/`, { withCredentials: true });

  }
  
  public addQuiz(quizzes:any){
    return this.http.post(`${this.baseUrl}/quiz/`,quizzes, { withCredentials: true });

  }
  
  public deleteQuizz(qid:any){
    return this.http.delete(`${this.baseUrl}/quiz/${qid}`);

  }

  public getQuiz(qid:any){
    return this.http.get(`${this.baseUrl}/quiz/${qid}`);

  }

  public updateQuiz(quizz:any){
    return this.http.put(`${this.baseUrl}/quiz/`,quizz);

  }

  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${this.baseUrl}/quiz/category/${cid}`);
  }
  
  public getActiveQuizzes(){
    return this.http.get(`${this.baseUrl}/quiz/active`);
  }
  
  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${this.baseUrl}/quiz/category/active/${cid}`);
  }
}
