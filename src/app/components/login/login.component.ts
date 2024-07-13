import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Assurez-vous que le champ est bien 'username'
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Login data:', this.loginForm.value); // Log the login data
      this.http.post('http://localhost:8081/auth/login', this.loginForm.value)
        .subscribe(
          (response: any) => {
            console.log('Login successful: ', response);
            this.router.navigate(['/']);
          },
          (error: any) => {
            console.error('Login error: ', error);
          }
        );
    } else {
      console.error('Form validation failed');
    }
  }}
