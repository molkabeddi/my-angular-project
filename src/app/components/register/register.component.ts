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
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      role: ['USER', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value, role: this.registerForm.value.role.toUpperCase() };
      this.http.post('http://localhost:8081/auth/register', formData)
        .subscribe(
          (response: any) => {
            console.log('Registration successful: ', response);
            this.router.navigate(['/login']);
          },
          (error: any) => {
            console.error('Registration error: ', error);
          }
        );
    } else {
      console.error('Form validation failed', this.registerForm.value, this.registerForm.errors);
    }
  }
}
