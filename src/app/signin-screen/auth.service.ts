import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import urljoin from 'url-join';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {MatSnackBarModule, MatSnackBar} from '@angular/material';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'applications/json'})
  };

@Injectable()
export class AuthService {
    usersUrl: string;
    currentUser?: User;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        public snackBar: MatSnackBar
    ) {
        this.usersUrl = urljoin(environment.apiUrl, 'auth');

        if (this.isLoggedIn()) {
            const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
            this.currentUser = new User(email, null, firstName, lastName, userId);
        }
    }

    signin(user: User) {
        return this.httpClient.post(urljoin(this.usersUrl, 'signin'), user, httpOptions);
    }

    login = ({ token, userId, firstName, lastName, email}) => {
        this.currentUser = new User(email, null, firstName, lastName, userId);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ userId, firstName, lastName, email }));
        this.router.navigateByUrl('/');
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    logout() {
        localStorage.clear();
        this.currentUser = null;
        this.router.navigateByUrl('/signin');
    }

    signup(user: User) {
        return this.httpClient.post(urljoin(this.usersUrl, 'signup'), user, httpOptions);
    }

    showError(message) {
        this.snackBar.open(message, 'OK', { duration: 3000 });
    }

    public handleError = (err: any) => {
        const { error: {name}, message, error } = err;
        if (name === 'TokenExpiredError') {
            this.showError('Tu sesión ha expirado');
        } else if (name === 'JsonWebTokenError') {
            this.showError('Ha habido un problema con tu sesión');
        } else {
            this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente.');
            console.log(error);
        }
        this.logout();
    }
}
