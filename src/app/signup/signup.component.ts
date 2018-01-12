import { User } from './../signin-screen/user.model';
import { AuthService } from './../signin-screen/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      // tslint:disable-next-line:max-line-length
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit () {
    if (this.signupForm.valid) {
      // console.log(this.signupForm.value);
      const { email, password, firstName, lastName } = this.signupForm.value;
      const user = new User(email, password, firstName, lastName);
      this.authService.signup(user)
        .subscribe(
          this.authService.login,
          error => {
            this.authService.handleError(error.error);
          }
        );
    }
  }

}
