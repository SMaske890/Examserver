package com.example.exam.controller;


import com.example.exam.model.exam.Question;
import com.example.exam.model.exam.Quiz;
import com.example.exam.service.QuestionService;
import com.example.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/question")
//@CrossOrigin("*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;
    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/{queId}")
    public Question getQuestion(@PathVariable("queId") Long queId) {
        return this.questionService.getQuestion(queId);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/")
    public Set<Question> getQuestions() {
        return this.questionService.getQuestions();
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @DeleteMapping("/{queId}")
    public void deleteQuestion(@PathVariable("queId") Long queId){
        this.questionService.deleteQuestion(queId);
    }


    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qId") Long qId) {
//        Quiz quiz = new Quiz();
//        quiz.setQId(qId);
//        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);


        Quiz quiz = this.quizService.getQuiz(qId);
        Set<Question> questions = quiz.getQuestions();
        List<Question> list = new ArrayList(questions);
        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }

        list.forEach((q)->{
            q.setAnswer("");
        });

        Collections.shuffle(list);
        return ResponseEntity.ok(list);

    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @GetMapping("/quiz/all/{qId}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qId") Long qId) {
        Quiz quiz = new Quiz();
        quiz.setQId(qId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    @CrossOrigin(origins ="http://localhost:4200" , allowCredentials = "true")
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        double marksGot = 0;
        int correctAns = 0;
        int attempted = 0;

        for(Question q : questions){
            Question question = this.questionService.get(q.getQueId());
            if(question.getAnswer().equals(q.getGivenAns()))
            {
                //correct
                correctAns++;

                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
//                        this.ques[0].quiz.maxMarks / this.ques.length;
                     marksGot += marksSingle;
            }

            if (q.getGivenAns()!=null) {
                attempted++;
            }

        };

        Map<String, Object> map = Map.of("marksGot",marksGot,"correctAns",correctAns,"attempted",attempted);

        return ResponseEntity.ok(map);
    }

}
