import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { QuestionScreenComponent } from './question-detail/question-screen.component';
import { ROUTES } from './question-detail/question.routing';

const routes: Routes = [
  { path: '', component: QuestionScreenComponent, pathMatch: 'full' },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'questions', children: ROUTES }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
