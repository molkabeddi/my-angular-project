import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],

      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      role: ['user', Validators.required],

    });
  }

  register() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/auth/register', this.registerForm.value)
        .subscribe((response: any) => {
          console.log('Registration successful: ', response);
          this.router.navigate(['/login']);
        }, (error: any) => {
          console.error('Registration error: ', error);
          // Handle error (e.g., show error message to the user)
        });
    } else {
      console.error('Form validation failed');
      // Handle form validation errors (e.g., show validation messages to the user)
    }
  }
}
