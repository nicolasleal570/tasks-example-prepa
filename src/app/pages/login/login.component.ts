import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  authWithGoogle(): void {
    this.authService
      .loginWithGoogle()
      .then(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/tasks']);
        }
      })
      .catch((err) => console.log(err));
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      if (res) {
        const { email } = res;

        if (email) {
          this.isAuth = true;
          return;
        }
      }

      this.isAuth = false;
    });
  }

  logout(): void {
    this.authService
      .logout()
      .then((res) => {
        console.log('Sesion cerrada');
      })
      .catch((err) => console.log(err));
  }
}
