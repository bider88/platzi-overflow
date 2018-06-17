import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { QuestionService } from './question.service';

// const q = new Question(
//     '¿Cómo reutlizo un componente en Android',
//     'No puedo reutlizar mi compenete en Android, soy novato y requiero ayuda.',
//     new Date('2018-01-04 13:15'),
//     'devicon-android-plain-wordmark colored'
// );

@Component({
    selector: 'app-question-list',
    templateUrl: './question-list.component.html',
    styles: [`
        i {
            font-size: 45px;
        }
        i.help {
            font-size: 45px !important;
            width: 45px !important;
            height: 45px !important;
            padding: 0 !important;
        }
    `],
    providers: [QuestionService]
})

export class QuestionListComponent implements OnInit {

    @Input() sort= '-createdAt';
    questions: Question[];
    loading = true;

    constructor(
        private questionService: QuestionService,
    ) {}

    ngOnInit() {
        // this.questionService
        //     .getQuestions(this.sort)
        //     .then((questions: Question[]) => {
        //         console.log(questions);
        //         this.questions = questions;
        //         this.loading = false;
        // });
        if (this.sort === '-createdAt') {
            this.questionService.getQuestions(this.sort)
                .subscribe(
                    (questions: Question[]) => {
                        this.questions = questions;
                        this.loading = false;
                    }, error => console.log(error)
                );
        } else {
            setTimeout(() => {
                this.questionService.getQuestions(this.sort)
                    .subscribe(
                        (questions: Question[]) => {
                            this.questions = questions;
                            this.loading = false;
                        }, error => console.log(error)
                    );
            }, 3000);
        }

    }
}
