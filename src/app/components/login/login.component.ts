import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: any = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe((response: any) => {
      localStorage.setItem('token', response.token); // Adjust according to your API response structure
      this.router.navigate(['/home']);
    }, (error: any) => {
      console.error('Login error: ', error);
      // Handle login error (e.g., show error message to the user)
    });
  }
}
