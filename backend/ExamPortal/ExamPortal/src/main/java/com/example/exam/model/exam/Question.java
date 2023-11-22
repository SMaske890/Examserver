package com.example.exam.model.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long queId;

    @Column(length = 5000)
    private String content;
    private String image;

    @Column(length = 500)
    private String option1;

    @Column(length = 500)
    private String option2;

    @Column(length = 500)
    private String option3;

    @Column(length = 500)
    private String option4;


//    @JsonIgnore   //will not be sent to client
    public String getAnswer() {
        return answer;
    }

//    @JsonProperty("answer")
    public void setAnswer(String answer) {
        this.answer = answer;
    }

    @Column(length = 500)
    private String answer;

    @Transient    //this column will not be added to table due to @Transient
    private String givenAns;


    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
