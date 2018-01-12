import { Question } from './question.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Answer } from '../answer-form/answers.model';
// import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'applications/json'})
};

@Injectable()
export class QuestionService {

  private questionsUrl: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
   }

  // getQuestions(sort = '-createdAt'): Promise<void | Question[]> {
  //   return this.httpClient.get<void | Question[]>(`${this.questionsUrl}?sort=${sort}`)
  //     .toPromise()
  //     .then(response => response as Question[])
  //     .catch(this.handleError);
  // }

  getQuestions(sort) {
    return this.httpClient.get<void | Question[]>(`${this.questionsUrl}?sort=${sort}`);
  }

  getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.httpClient.get<void | Question>(url)
      .toPromise()
      .then(response => response as Question)
      .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: Question) {
    const token = this.getToken();
    return this.httpClient.post<Question>(this.questionsUrl + token, question, httpOptions);
  }

  addAnswer(answer: Answer) {
    const token = this.getToken();
    const url = urljoin(this.questionsUrl, answer.question._id, 'answers');
    return this.httpClient.post<Answer>(url + token, answer, httpOptions);
  }

  handleError(error: any) {
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.log(errMsg);
  }

}
