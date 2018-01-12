import { AuthService } from './signin-screen/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private authService: AuthService
  ) {

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getFirstName() {
    return this.authService.currentUser.firstName;
  }

  logout() {
    this.authService.logout();
  }
}
