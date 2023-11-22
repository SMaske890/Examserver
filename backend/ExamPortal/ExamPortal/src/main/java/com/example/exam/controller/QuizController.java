package com.example.exam.controller;


import com.example.exam.model.exam.Category;
import com.example.exam.model.exam.Quiz;
import com.example.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/quiz")
//@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping("/")
    public Quiz addQuiz(@RequestBody Quiz quiz) {
        return this.quizService.addQuiz(quiz);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PutMapping("/")
    public Quiz updateQuiz(@RequestBody Quiz quiz) {
        return this.quizService.updateQuiz(quiz);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/{qId}")
    public Quiz getQuiz(@PathVariable("qId") Long qId) {
        return this.quizService.getQuiz(qId);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/")
    public Set<Quiz> getQuizzes() {
        return this.quizService.getQuizzes();
    }



    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @DeleteMapping("/{qId}")
    public void deleteQuiz(@PathVariable("qId") Long qId) {
        this.quizService.deleteQuiz(qId);
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/category/{cId}")
    public List<Quiz> getQuizzesOfCategory(@PathVariable("cId") Long cId){
        Category category= new Category();
        category.setCId(cId);
        return this.quizService.getQuizzesOfCategory(category);
    }

    //getActive quizzes

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/active")
    public List<Quiz> getActiveQuizzes(){
        return this.quizService.getActiveQuizzes();
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/category/active/{cId}")
        public List<Quiz> getActiveQuizzesOfCategory(@PathVariable("cId") Long cId){
            Category category=new Category();
            category.setCId(cId);
            return this.quizService.getActiveQuizzesOfCategory(category);
        }

}
