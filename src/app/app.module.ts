import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import 'hammerjs';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { SignupComponent } from './signup/signup.component';
import { QuestionListComponent } from './question-detail/question-list.component';
import { QuestionFormComponent } from './question-detail/question-form.component';
import { QuestionScreenComponent } from './question-detail/question-screen.component';

import { AppRoutingModule } from './/app-routing.module';

import { QuestionService } from './question-detail/question.service';
import { AuthService } from './signin-screen/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswerFormComponent,
    SigninScreenComponent,
    SignupComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    QuestionService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
