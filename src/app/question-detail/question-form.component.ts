import { AuthService } from './../signin-screen/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Question } from './question.model';
import icons from './icons';
import { QuestionService } from './question.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-question-form',
    templateUrl: './question-form.component.html',
    styles: [`
        i {
            font-size: 45px;
        }

        small {
            display: block;
        }
    `]
})

export class QuestionFormComponent implements OnInit {

    icons: Object[] = icons;

    getIconVersion(icon: any) {
        let version;
        if (icon.versions.font.includes('plain-wordmark')) {
            version = 'plain-wordmark';
        } else {
            version = icon.versions.font[0];
        }
        return version;
    }

    constructor(
        private questionService: QuestionService,
        private snackBar: MatSnackBar,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/signin');
        }
    }

    onSubmit(form: NgForm) {
        const q = new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        // console.log(q);
        this.questionService.addQuestion(q)
            .subscribe(
                ({ _id }) => {
                    const snackBarRef = this.snackBar.open('Nueva pregunta agregada', 'OK', {
                        duration: 3000,
                    });

                    snackBarRef.afterDismissed().subscribe(() => {
                        this.router.navigate(['/questions', _id]);
                    });
                },
                error => {
                    this.authService.handleError(error.error);
                }
            );

        form.resetForm();
    }
}
