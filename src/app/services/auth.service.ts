import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const credentials = `${username}:${password}`;
    
    const basicAuth = `Basic ${btoa(credentials)}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post(AUTH_API + 'login', { username, password }, httpOptions);
  }

  register(username: string, email: string, password: string, role: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
      roles: role // send the role array as a JSON object
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  }
  

