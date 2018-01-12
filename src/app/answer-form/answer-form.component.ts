import { Router } from '@angular/router';
import { AuthService } from './../signin-screen/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../question-detail/question.model';
import { User } from '../signin-screen/user.model';
import { Answer } from './answers.model';

import { QuestionService } from '../question-detail/question.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit {

  @Input() question: Question;

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }

    const answer = new Answer(
      form.value.description,
      this.question
    );
    // this.question.answers.unshift(answer);
    this.questionService.addAnswer(answer)
      .subscribe(
        a => {
          this.question.answers.unshift(a);
        },
        error => {
          this.authService.handleError(error.error);
        }
      );
    form.reset();
  }

}
