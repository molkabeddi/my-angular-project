import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';
interface User {
  id: number;
  username: string;
  role: string;
  // add other user properties as needed
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string = '';
  private roles: string[] = [];
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = `${username}:${password}`;
    const basicAuth = `Basic ${btoa(credentials)}`;
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': basicAuth // Include if needed
      })
    };
  
    return this.http.post<any>(AUTH_API + 'login', { username, password }, httpOptions).pipe(
      tap(response => {
        if (response && response.token && response.userId) {
          this.setToken(response.token);
          this.setUserId(response.userId); // Store userId if available
        }
      })
    );
  }
  
  private setUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
  register(username: string, email: string, password: string, roles: string[]): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username,
      email,
      password,
      roles // send roles array as JSON
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }



  private setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token); // Store token in local storage
  }

  getToken(): string {
    return localStorage.getItem('authToken') || ''; // Retrieve token from local storage
  }

  private setRoles(roles: string[]) {
    this.roles = roles.map(role => role.toUpperCase());
    localStorage.setItem('userRoles', JSON.stringify(this.roles));
    console.log('Roles set:', this.roles); // Log stored roles
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('userRoles');
    const parsedRoles = roles ? JSON.parse(roles) : [];
    console.log('Retrieved roles:', parsedRoles); // Log retrieved roles
    return parsedRoles;
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role.toUpperCase());
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Check if the token exists
  }

  logout(): void {
    this.token = '';
    this.roles = [];
    localStorage.removeItem('authToken'); // Remove token from local storage
    localStorage.removeItem('userRoles'); // Remove roles from local storage
  }
  getCurrentUser(): User | null {
    // Assuming the current user is stored in local storage after login
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
    return this.currentUser;
  }
}
