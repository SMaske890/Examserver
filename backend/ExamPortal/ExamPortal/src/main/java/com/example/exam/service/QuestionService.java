package com.example.exam.service;

import com.example.exam.model.exam.Question;
import com.example.exam.model.exam.Quiz;
import com.example.exam.repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    public Set<Question> getQuestions() {
        return new HashSet<>(this.questionRepository.findAll());
    }

    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    public void deleteQuestion(Long queId){
        this.questionRepository.deleteById(queId);
    }

    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);

    }

    public Question get(Long queId){
        return this.questionRepository.getOne(queId);
    }
}
