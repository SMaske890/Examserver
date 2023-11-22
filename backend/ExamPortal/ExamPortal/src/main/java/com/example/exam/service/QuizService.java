package com.example.exam.service;

import com.example.exam.model.exam.Category;
import com.example.exam.model.exam.Quiz;
import com.example.exam.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public Quiz addQuiz(Quiz quiz){
        return  this.quizRepository.save(quiz);
    }

    public Quiz updateQuiz(Quiz quiz){
        return  this.quizRepository.save(quiz);
    }

    public Set<Quiz> getQuizzes(){
        return new HashSet<>(this.quizRepository.findAll());
    }

    public Quiz getQuiz(Long quizId){
        return this.quizRepository.findById(quizId).get();
    }

    public void deleteQuiz(Long quizId){
        this.quizRepository.deleteById(quizId);
    }


    public List<Quiz> getQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategory(category);
    }

    //getActive quizzes
    public List<Quiz> getActiveQuizzes(){
        return this.quizRepository.findByActive(true);
    }

    public List<Quiz> getActiveQuizzesOfCategory(Category c){
        return this.quizRepository.findByCategoryAndActive(c, true);

    }
}
