import { QuestionService } from './question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Question } from './question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {

  question?: Question;
  loading = true;
  id = null;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.questionService
      .getQuestion(this.id)
      .then((question: Question) => {
        this.question = question;
        this.loading = false;
      });
  }

}
